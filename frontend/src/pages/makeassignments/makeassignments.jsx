import React, { useState } from "react";
import Header from "../../components/navbar/Navbar";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import './makeassignments.css'; // Ensure you have appropriate styling for your chat window

const MakeAssignments = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [assignmentNo, setAssignmentNo] = useState("");
  const [description, setDescription] = useState("");
  const [profName, setProfName] = useState("");
  const [deadline, setDeadline] = useState("");

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAssignment = {
      assignmentNo,
      description,
      profName,
      deadline,
    };
    console.log("New Assignment:", newAssignment);
    // Here you can add code to save the assignment data, e.g., send it to a backend server
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
            <h2>MAKE ASSIGNMENT</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="assignmentNo" className="mb-3">
                <Form.Label>Assignment No.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Assignment No."
                  value={assignmentNo}
                  onChange={(e) => setAssignmentNo(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="profName" className="mb-3">
                <Form.Label>Professor Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Professor Name"
                  value={profName}
                  onChange={(e) => setProfName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="deadline" className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeAssignments;
