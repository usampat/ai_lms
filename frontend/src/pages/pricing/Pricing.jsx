import { useState } from 'react'

import Navbar from '../../components/navbar/Navbar'
import './Pricing.css'

import Plan from "./Plan"

const BasicPlanFeatures = [
  "Feature 1",
  "Feature 2",
  "Feature 3"
]

const PremiumPlanFeatures = [
  "Feature 1",
  "Feature 2",
  "Feature 3"
]

const EnterpricePlanFeatures = [
  "Feature 1",
  "Feature 2",
  "Feature 3"
]

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(1);

  return (
    <div className='container'>
      <Navbar />

      <div className='pricing-page'>
        <h1>Pricing Plans</h1>

        <div className='pricing-cards'>

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

        <button className='subscribe-btn'>Subscribe</button>
      </div>
    </div>
  )
}

export default Pricing
