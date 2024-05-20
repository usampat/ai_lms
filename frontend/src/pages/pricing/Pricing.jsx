import Navbar from '../../components/navbar/Navbar'
import './Pricing.css'

function Pricing() {
  return (
    <div>
      <Navbar />

      <div className='pricing page'>
        <h1>Pricing Plans</h1>
        <div className='pricing-cards'>
          <div className='pricing-card'>
            <h3>Basic Plan</h3>
            <p className='price'>$10/month</p>
            <p>Access to basic features</p>
          </div>
          <div className='pricing-card'>
            <h3>Premium Plan</h3>
            <p className='price'>$20/month</p>
            <p>Access to premium features and more</p>
          </div>
          <div className='pricing-card'>
            <h3>Enterprice Plan</h3>
            <p className='price'>$30/month</p>
            <p>Access to all features</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
