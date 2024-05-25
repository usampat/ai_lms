import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ResultModal({ correctAnswers, onClose }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    // <Modal show={true} onHide={onClose}  centered >
    //   <Modal.Header closeButton>
    //     <Modal.Title>Quiz Result</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <p>You answered {correctAnswers} questions correctly.</p>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="success" style={{color:"white",border:'none'}} onClick={onClose}>
    //       Close
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
    <>
      <Modal
        show={true}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>RESULT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            You answered {correctAnswers} questions correctly.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" style={{color:"white",border:'none'}} onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResultModal;
