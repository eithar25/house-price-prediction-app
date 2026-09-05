import { useLocation, useNavigate } from "react-router-dom";

function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹ ${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹ ${(price / 100000).toFixed(2)} Lac`;
  }
  return `₹ ${price.toLocaleString()}`;
}

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const price = location.state?.price as number | undefined;

  return (
    <div className="hero">
      <div className="glass-card" style={{ textAlign: "center" }}>
        {price === undefined ? (
          <>
            <h1>No prediction found</h1>
            <p>Please submit the form first.</p>
            <button onClick={() => navigate("/")}>Back to Form</button>
          </>
        ) : (
          <>
            <h1>Predicted Price</h1>
            <p style={{ fontSize: 40, fontWeight: 800, color: "white", margin: "20px 0" }}>
              {formatPrice(price)}
            </p>
            <button onClick={() => navigate("/")}>Predict Another</button>
          </>
        )}
      </div>
    </div>
  );
}