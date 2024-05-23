import { useState } from "react";

import Navbar from "../../components/navbar/Navbar";
import "./Pricing.css";

import Plan from "./Plan";
import { Button, Container } from "react-bootstrap";
import { Bounce, ToastContainer, toast } from "react-toastify";

const BasicPlanFeatures = ["Feature 1", "Feature 2", "Feature 3"];

const PremiumPlanFeatures = ["Feature 1", "Feature 2", "Feature 3"];

const EnterpricePlanFeatures = ["Feature 1", "Feature 2", "Feature 3"];

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const subscribeClick = () => {
    toast.success("Subscribed", {
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
      <Navbar />
      <Container>
        <div className="pricing-page">
          <h1>Pricing Plans</h1>

          <div className="pricing-cards">
            <Plan
              id={0}
              title="Basic Plan"
              price="$20/month"
              features={BasicPlanFeatures}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />

            <Plan
              id={1}
              title="Premium Plan"
              price="$40/month"
              features={PremiumPlanFeatures}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />

            <Plan
              id={2}
              title="Premium Plan"
              price="$50/month"
              features={EnterpricePlanFeatures}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          </div>

          <Button
            variant="outline-primary"
            className="subscribe-btn"
            onClick={subscribeClick}
          >
            Subscribe
          </Button>
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
      <ToastContainer />
    </>
  );
}

export default Pricing;
