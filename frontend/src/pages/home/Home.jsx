import "./Home.css";

import Navbar from "../../components/navbar/Navbar";
import FeatureCard from "./FeatureCard";
import Background from "../../components/background/Background";

function Home() {
  return (
    <div>
      <Navbar />
      <Background/>
      <div className="home page">
        <h1>AI powered LMS system</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam hic
          possimus ducimus modi exercitationem. Repellat quos pariatur cumque
          odit necessitatibus quia, mollitia, vero vel tenetur, ab eveniet
          consequuntur? Numquam, explicabo quod, similique maiores voluptates
          ullam possimus provident veniam, distinctio iure earum reprehenderit
          excepturi eaque non quo. Assumenda sapiente commodi pariatur eos
          error. Nobis sequi quaerat.
        </p>

        <div className="features">
          <FeatureCard
            title="Feature 1"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <FeatureCard
            title="Feature 2"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <FeatureCard
            title="Feature 3"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
