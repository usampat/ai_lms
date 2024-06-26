import React, { useState } from "react";
import Header from "../../components/navbar/Navbar";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import "./Assignments.css";

function Assignments() {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  // Sample assignment data
  const assignments = [
    {
      name: "Assignment 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      professor: "Prof. Smith",
      deadline: "2024-06-01",
    },
    {
      name: "Assignment 2",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      professor: "Prof. Johnson",
      deadline: "2024-06-05",
    },
    {
      name: "Assignment 3",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      professor: "Prof. Brown",
      deadline: "2024-06-10",
    },
    {
      name: "Assignment 4",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      professor: "Prof. Wilson",
      deadline: "2024-06-15",
    },
  ];

  return (
    <Container fluid className="main">
      <Row>
        <Header toggleSidebar={toggleSidebar} dashboard={true} />
      </Row>
      <Row className="content-row">
        <Col className={`sidebar-col ${showSideBar ? "expanded" : ""}`}>
          <Sidebar showSideBar={showSideBar} />
        </Col>
        <Col className={`content-col ${showSideBar ? "collapsed":"expanded"}`}>
          <Row>
            <h2>ASSIGNMENTS</h2>
            {assignments.map((assignment, index) => (
              <Col key={index} md={6} lg={6} xl={6}>
                <Card className="assignment-card">
                  <Card.Body>
                    <Card.Title><b>{assignment.name}</b></Card.Title>
                    <Card.Text><b>Description:</b> {assignment.description}</Card.Text>
                    <Card.Text><b>Professor:</b> {assignment.professor}</Card.Text>
                    <Row>
                    <Col sm={true}>
                      <Card.Text><b>Deadline:</b> {assignment.deadline}</Card.Text> 
                    </Col>
                    <Col sm={true}>
                      <Form.Control type="file" size="sm"/>
                    </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Assignments;
