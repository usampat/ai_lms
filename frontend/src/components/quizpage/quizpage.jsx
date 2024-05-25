import React, { useState } from 'react'
import '../../pages/quiz/Quiz.css'
import { HQuestions,CSQuestions,GKQuestions,GQuestions } from '../../pages/quiz/questions';
import { Row, Col, Button } from 'react-bootstrap'
import ResultModal from './resultmodal';

function Quizpage({quizId,quizName,onQuizSubmit}) {
    const [answers, setAnswers] = useState({});
    const [showModal,setShowModal] = useState(false);
    let correct=0;
    let questions;
    const handleAnswerClick = (questionIndex, optionIndex) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionIndex]: optionIndex,
        }));
      };
    const handleSubmitQuiz = () => {
    setShowModal(!showModal);
    };
    
    switch (quizId) {
        case 1:
            questions=CSQuestions;
            break;
        case 2:
            questions=GQuestions;
            break;
        case 3:
            questions=GKQuestions;
            break;
        default:
            questions=HQuestions;
    }
    const isCorrectAnswer = (questionIndex, optionIndex) => {
        if(questions[questionIndex].correctAnswer === optionIndex){
            correct+=1;
        }
        return questions[questionIndex].correctAnswer === optionIndex;
    };
    return (
    <>
        <h1>{quizName}</h1>
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
                            ? "select"
                            : answers[qIndex] === oIndex && !isCorrectAnswer(qIndex, oIndex)
                            ? "select"
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
          <Button style={{marginLeft:'20px'}} variant='filled-success' onClick={handleSubmitQuiz}>Submit</Button>
          {
            showModal && 
            (
                <ResultModal correctAnswers={correct} onClose={onQuizSubmit} />
            )
          }
    </>
  )
}

export default Quizpage