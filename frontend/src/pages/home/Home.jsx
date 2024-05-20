import './Home.css'

import Navbar from "../../components/navbar/Navbar"

function Home() {
  return (
    <div>
      <Navbar />

      <div className='home page'>
        <h1>AI powered LMS system</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam hic
          possimus ducimus modi exercitationem. Repellat quos pariatur cumque odit
          necessitatibus quia, mollitia, vero vel tenetur, ab eveniet
          consequuntur? Numquam, explicabo quod, similique maiores voluptates
          ullam possimus provident veniam, distinctio iure earum reprehenderit
          excepturi eaque non quo. Assumenda sapiente commodi pariatur eos error.
          Nobis sequi quaerat.
        </p>
        <div className='features'>
          <div className='feature-card'>
            <h3>Feature 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className='feature-card'>
            <h3>Feature 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className='feature-card'>
            <h3>Feature 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home
