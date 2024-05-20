import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Auth from './pages/auth/Auth'
import Pricing from './pages/pricing/Pricing'

const App = () => {

  return <BrowserRouter>

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='auth' element={<Auth />} />
      <Route path='pricing' element={<Pricing />} />
    </Routes>

    <ToastContainer/>

  </BrowserRouter>
}

export default App;
