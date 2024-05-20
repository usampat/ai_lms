import "./FeatureCard.css";

function FeatureCard({ title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-title">{title}</div>
      <div className="feature-desc">{desc}</div>
    </div>
  );
}

export default FeatureCard;
