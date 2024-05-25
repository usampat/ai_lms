import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './NotFound.css'; // Create this file for custom styling

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container className="not-found-container">
      <Row>
        <Col className="text-center">
          <h1 className="not-found-title">404</h1>
          <p className="not-found-message">Page Not Found</p>
          <Button variant="primary" onClick={handleGoBack}>Go to Home</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
