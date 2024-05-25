// Plan.jsx
import React from "react";
import { FcCheckmark } from "react-icons/fc";
import "./Pricing.css";

function Plan({ id, title, price, features, onSubscribe }) {
  return (
    <div className="pricing-plan-container">
      <h3 className="pricing-plan-title">{title}</h3>
      <p className="pricing-price">{price}</p>
      <ul className="pricing-feature-container">
        {features.map((feature, ind) => (
          <li key={ind} className="pricing-feature">
            <FcCheckmark className="pricing-checkmark" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="pricing-btn-container">
        <button
          className="pricing-btn"
          onClick={() => {
            onSubscribe(title);
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Plan;
