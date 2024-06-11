import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Auth from "./pages/auth/Auth";
import Pricing from "./pages/pricing/Pricing";
import Quiz from "./pages/quiz/Quiz";
import Assignments from "./pages/assignments/Assignments";
import Result from "./pages/result/Result";
import Chat from "./pages/chat/chat";
import MakeQuiz from "./pages/makequiz/makequiz";
import MakeAssignments from "./pages/makeassignments/makeassignments";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="auth" element={<Auth />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="result" element={<Result />} />
        <Route path="chat" element={<Chat />} />
        <Route path="makequiz" element={<MakeQuiz />} />
        <Route path="makeassignment" element={<MakeAssignments />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
