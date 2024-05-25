import React, { useState } from "react";
import Header from "../../components/navbar/Navbar";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import './makequiz.css';

const MakeQuiz = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" }
  ]);

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    if (questions.length < 10) {
      setQuestions([
        ...questions,
        { question: "", options: ["", "", "", ""], correctAnswer: "" }
      ]);
    }
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add Backend for now only frontend
    console.log("Submitted Questions:", questions);
  };

  return (
    <Container fluid className="main">
      <Row>
        <Header toggleSidebar={toggleSidebar} dashboard={true} />
      </Row>
      <Row className="content-row">
        <Col className={`sidebar-col ${showSideBar ? "expanded" : ""}`}>
          <Sidebar showSideBar={showSideBar} />
        </Col>
        <Col className={`content-col ${showSideBar ? "collapsed" : "expanded"}`}>
          <div className="dashboard-container page">
            <h2>MAKE QUIZ</h2>
            <Form onSubmit={handleSubmit}>
              {questions.map((q, qIndex) => (
                <div key={qIndex} className="question-block">
                  <Form.Group className="mb-3">
                    <Form.Label>Question {qIndex + 1}</Form.Label>
                    <Form.Control
                      type="text"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(qIndex, e)}
                      required
                    />
                  </Form.Group>
                  {q.options.map((option, oIndex) => (
                    <Form.Group key={oIndex} className="mb-3">
                      <Form.Label>Option {oIndex + 1}</Form.Label>
                      <Form.Control
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                        required
                      />
                    </Form.Group>
                  ))}
                  <Form.Group className="mb-3">
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Select
                      value={q.correctAnswer}
                      onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                      required
                    >
                      <option value="">Select Correct Answer</option>
                      {q.options.map((_, oIndex) => (
                        <option key={oIndex} value={oIndex}>
                          Option {oIndex + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {questions.length > 1 && (
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveQuestion(qIndex)}
                    >
                      Remove Question
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="primary"
                onClick={handleAddQuestion}
                disabled={questions.length >= 10}
              >
                Add Question
              </Button>
              <Button variant="success" type="submit">
                Submit Quiz
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeQuiz;
