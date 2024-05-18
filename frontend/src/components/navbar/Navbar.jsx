import  { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>My LMS</div>
      <div className='burger-menu' onClick={toggleNavbar}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to='/' onClick={toggleNavbar}>
            Home
          </Link>
        </li>
        <li>
          <Link to='/dashboard' onClick={toggleNavbar}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to='/pricing' onClick={toggleNavbar}>
            Pricing
          </Link>
        </li>
        <li>
          <Link to='/auth' onClick={toggleNavbar}>
            Login/Signup
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
