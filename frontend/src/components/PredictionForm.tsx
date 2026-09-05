import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictPrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";
import locations from "../locations.json";

const initialState: PredictionRequest = {
  carpet_area_sqft: 0,
  floor_num: 0,
  bathroom_num: 1,
  balcony_num: 0,
  parking_count: 0,
  Transaction: "Resale",
  Furnishing: "Unfurnished",
  facing: "East",
  Ownership: "Freehold",
  parking_type: "Covered",
  location_grouped: (locations as string[])[0] ?? "other",
  overlooks_main_road: 0,
  overlooks_garden_park: 0,
  overlooks_pool: 0,
};

export default function PredictionForm() {
  const [form, setForm] = useState<PredictionRequest>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function updateField<K extends keyof PredictionRequest>(
    key: K,
    value: PredictionRequest[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.carpet_area_sqft <= 0) {
      setError("Carpet area must be greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const result = await predictPrice(form);
      navigate("/result", { state: { price: result.predicted_price } });
    } catch (err) {
      setError("Something went wrong while getting the prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "0 auto" }}>
      <div>
        <label>Location</label>
        <select
          value={form.location_grouped}
          onChange={(e) => updateField("location_grouped", e.target.value)}
          required
        >
          {(locations as string[]).map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Carpet Area (sqft)</label>
        <input
          type="number"
          value={form.carpet_area_sqft}
          onChange={(e) => updateField("carpet_area_sqft", Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Floor</label>
        <input
          type="number"
          value={form.floor_num}
          onChange={(e) => updateField("floor_num", Number(e.target.value))}
        />
      </div>

      <div>
        <label>Bathrooms</label>
        <input
          type="number"
          value={form.bathroom_num}
          onChange={(e) => updateField("bathroom_num", Number(e.target.value))}
        />
      </div>

      <div>
        <label>Balconies</label>
        <input
          type="number"
          value={form.balcony_num}
          onChange={(e) => updateField("balcony_num", Number(e.target.value))}
        />
      </div>

      <div>
        <label>Parking Spots</label>
        <input
          type="number"
          value={form.parking_count}
          onChange={(e) => updateField("parking_count", Number(e.target.value))}
        />
      </div>

      <div>
        <label>Furnishing</label>
        <select
          value={form.Furnishing}
          onChange={(e) => updateField("Furnishing", e.target.value)}
        >
          <option>Furnished</option>
          <option>Semi-Furnished</option>
          <option>Unfurnished</option>
        </select>
      </div>

      <div>
        <label>Transaction</label>
        <select
          value={form.Transaction}
          onChange={(e) => updateField("Transaction", e.target.value)}
        >
          <option>New Property</option>
          <option>Resale</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </form>
  );
}