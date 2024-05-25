// Pricing.jsx
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Plan from "./Plan";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Background from "../../components/background/Background";
import "./Pricing.css";
import Header from "../../components/navbar/Navbar";

const BasicPlanFeatures = ["Feature 1", "Feature 2", "Feature 3"];
const PremiumPlanFeatures = ["Feature 1", "Feature 2", "Feature 3"];
const EnterpricePlanFeatures = ["Feature 1", "Feature 2", "Feature 3"];

function Pricing() {
  const subscribeClick = (planName) => {
    toast.success(`Subscribed to ${planName}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <Header/>
      <Container>
        <Background />
        <h1 className="pricing-title">Pricing Plans</h1>
        <div className="pricing-cards-container">
          <Plan
            id={0}
            title="Basic Plan"
            price="$0/month"
            features={BasicPlanFeatures}
            onSubscribe={subscribeClick}
          />
          <Plan
            id={1}
            title="Premium Plan"
            price="$20/month"
            features={PremiumPlanFeatures}
            onSubscribe={subscribeClick}
          />
          <Plan
            id={2}
            title="Enterprise Plan"
            price="$40/month"
            features={EnterpricePlanFeatures}
            onSubscribe={subscribeClick}
          />
        </div>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default Pricing;
