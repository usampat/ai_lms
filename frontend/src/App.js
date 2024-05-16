import React from "react"

import Head from "./components/Head/Head"
import Header from "./components/Header/Header.js"

const App = () => {
  return (
    <div>
      <Head 
        title="AI LMS"
        description="AI Powered Learning Mangement System"
        keywords="AI,ML,LMS,Education,MERN"
      />

      <Header />
    </div>
  );
}

export default App;
