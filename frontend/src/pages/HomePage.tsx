import PredictionForm from "../components/PredictionForm";

export default function HomePage() {
  return (
    <div className="hero">
      <div className="glass-card">
        <h1>🏠 House Price Prediction</h1>
        <p>Enter the property details below to get an estimated price.</p>
        <PredictionForm />
      </div>
    </div>
  );
}