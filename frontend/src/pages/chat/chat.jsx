import React, { useState } from "react";
import Header from "../../components/navbar/Navbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import './chat.css'; // Ensure you have appropriate styling for your chat window

const Chat = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, inputMessage]);
      setInputMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
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
            <h2>DISCUSSION</h2>
            <div className="chat-window">
              <div className="messages">
                {messages.map((message, index) => (
                  <div key={index} className="message">
                    {message}
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                />
                <Button variant='success' onClick={handleSendMessage}>Send</Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
