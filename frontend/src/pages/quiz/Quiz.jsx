import React, { useState } from "react";
import Header from "../../components/navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import "./Quiz.css";

const Quiz = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [answers, setAnswers] = useState({});

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const questions = [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      correctAnswer: 1,
    },
    {
      question: "Which language is primarily used for web development?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correctAnswer: 2,
    },
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Central Process Unit", "Central Processing Universal", "Computer Personal Unit"],
      correctAnswer: 0,
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
      },
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Charles Dickens", "F. Scott Fitzgerald"],
        correctAnswer: 0,
      },
      {
        question: "What is the chemical symbol for water?",
        options: ["Wa", "Wt", "H2O", "Hy"],
        correctAnswer: 2,
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: 1,
      },
      {
        question: "What year did the Titanic sink?",
        options: ["1912", "1922", "1902", "1892"],
        correctAnswer: 0,
      },
      {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue whale", "Giraffe", "Hippo"],
        correctAnswer: 1,
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Al", "At"],
        correctAnswer: 0,
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        correctAnswer: 0,
      },
      {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Makalu"],
        correctAnswer: 2,
      },
      {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Dollar", "Yen", "Rupee"],
        correctAnswer: 2,
      },
  ];

  const handleAnswerClick = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionIndex,
    }));
  };

  const isCorrectAnswer = (questionIndex, optionIndex) => {
    return questions[questionIndex].correctAnswer === optionIndex;
  };

  return (
    <Container fluid className="main">
      <Row>
        <Header toggleSidebar={toggleSidebar} dashboard={true} />
      </Row>
      <Row className="content-row">
        <Col className="sidebar-col" sm={showSideBar ? 2 : 1}>
          <Sidebar showSideBar={showSideBar} />
        </Col>
        <Col className="content-col" sm={showSideBar ? 10 : 11}>
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="quiz-question">
              <h3>{qIndex+1}.{question.question}</h3>
              <Row>
                {question.options.map((option, oIndex) => (
                    <Col sm={true}>
                        <button
                            key={oIndex}
                            className={`quiz-option ${
                            answers[qIndex] !== undefined
                            ? answers[qIndex] === oIndex && isCorrectAnswer(qIndex, oIndex)
                            ? "correct"
                            : answers[qIndex] === oIndex && !isCorrectAnswer(qIndex, oIndex)
                            ? "wrong"
                            : ""
                            : ""
                        }`}
                        onClick={() => handleAnswerClick(qIndex, oIndex)}
                        >
                            {option}
                        </button>
                    </Col>
                    ))}
              </Row>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Quiz;
