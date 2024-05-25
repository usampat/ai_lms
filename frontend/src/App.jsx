import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Auth from "./pages/auth/Auth";
import Pricing from "./pages/pricing/Pricing";
import Quiz from "./pages/quiz/Quiz";
import Assignments from "./pages/assignments/Assignments";
import { useEffect, useState } from "react";
import Result from "./pages/result/Result";
import Chat from "./pages/chat/chat";
import MakeQuiz from "./pages/makequiz/makequiz";
import MakeAssignments from "./pages/makeassignments/makeassignments";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  const [login,setLogin]=useState(localStorage.getItem("auth") === "true");
  const [role,setRole]=useState('');
  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(localStorage.getItem("auth") === "true");
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setRole(user.user.role);
      }
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={login?(<Dashboard/>):(<Home/>)} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="auth" element={<Auth />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="result" element={<Result />} />
        <Route path="chat" element={<Chat/>}/>
        {
          role==='teacher' && (
            <>
             <Route path="makequiz" element={<MakeQuiz/>}/>
             <Route path="makeassignment" element={<MakeAssignments/>}/>
            </>)
        }
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
