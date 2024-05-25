import React, { useState } from "react";
import Header from "../../components/navbar/Navbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import "./Quiz.css";
import Quizpage from "../../components/quizpage/quizpage";

const Quiz = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizId,setQuizId]=useState(1);
  const [quizName,setQuizName]=useState('');
  // const [answers, setAnswers] = useState({});

  const handleStartQuiz = (id,name) => {
    setQuizId(id);
    setQuizName(name);
    setShowQuiz(true); // Display the quiz page when the "Start" button is clicked
  };

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleQuizSubmission = () => {
    setShowQuiz(false); 
  };

  const quizData = [
    { id: 1, name: "Quiz 1 (Computer Science)" },
    { id: 2, name: "Quiz 2 (Geography)" },
    { id: 3, name: "Quiz 3 (General Knowledge)" },
    { id: 4, name: "Quiz 4 (History)" },
  ];

  // const handleAnswerClick = (questionIndex, optionIndex) => {
  //   setAnswers((prevAnswers) => ({
  //     ...prevAnswers,
  //     [questionIndex]: optionIndex,
  //   }));
  // };

  // const isCorrectAnswer = (questionIndex, optionIndex) => {
  //   return questions[questionIndex].correctAnswer === optionIndex;
  // };

  return (
    <Container fluid className="main">
      <Row>
        <Header toggleSidebar={toggleSidebar} dashboard={true} />
      </Row>
      <Row className="content-row">
        <Col className={`sidebar-col ${showSideBar ? "expanded" : ""}`}>
          <Sidebar showSideBar={showSideBar} />
        </Col>
        <Col
          className={`content-col ${showSideBar ? "collapsed" : "expanded"}`}
        >
          <h1 style={{display:'flex',justifyContent:'center'}}> QUIZ </h1>
          <div className="quiz-buttons">
            {!showQuiz &&quizData.map((quiz,index) => (
              <Row
                key={quiz.id}
                className="quiz-row"
                style={{ marginTop: "10px", marginLeft:'10px' }}
              >
                <Col xs={8}>{quiz.name}</Col>
                <Col xs={4}>
                  <Button
                    variant="success"
                    onClick={() => handleStartQuiz(quiz.id,quiz.name)}
                  >
                    Start
                  </Button>
                </Col>
                <hr className="mt-2 mb-2"/>
              </Row>
            ))}
          </div>
          {/* Render Quizpage component if a quiz is selected */}
          {showQuiz && <Quizpage quizId={quizId} quizName={quizName} onQuizSubmit={handleQuizSubmission} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Quiz;
