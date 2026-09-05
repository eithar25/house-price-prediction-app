import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h1>404 — Page Not Found</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
}