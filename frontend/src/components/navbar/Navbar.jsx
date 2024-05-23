import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Offcanvas,
  OffcanvasHeader,
} from "react-bootstrap";
// import {Button, Col, Container, Modal, NavLink, Row} from 'react-bootstrap';
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import "./Navbar.css";
import Sidebar from "../Sidebar/sidebar";
import Dashboard from "../../pages/dashboard/Dashboard";

function Header({ toggleSidebar, dashboard }) {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(localStorage.getItem("auth") === "true");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.setItem("auth", false);
    setLogin(false);
    navigate("/auth");
  };
  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(localStorage.getItem("auth") === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Navbar key="lg" expand="lg" bg="dark" className="bg-body-primary">
      <Container fluid>
        {login && dashboard && !isMobileView && (
          <Button onClick={toggleSidebar}>
            <IoMdMenu />
          </Button>
        )}
        <Navbar.Brand className="navbar-brand">AI LMS</Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`responsive-navbar-nav`}
          className="navbar-toggle d-lg-none"
        >
          <IoMdMenu style={{ color: "white" }} />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton className="bg-dark text-white">
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-dark">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href={login ? "/dashboard" : "/"} className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link href="/pricing">Pricing</Nav.Link>
              {isMobileView && ( // Render only in mobile view
              <>
                <Link to="/quiz" className="nav-link" onClick={toggleNavbar}>
                  Quiz
                </Link>
                <Link to="/assignments" className="nav-link" onClick={toggleNavbar}>
                  Assignments
                </Link>
                <Link to="/dashboard" className="nav-link" onClick={toggleNavbar}>
                  Dashboard
                </Link>
              </>
            )}
              {login ? (
                <Nav.Link onClick={handleLogOut} className="nav-link">
                  LogOut
                </Nav.Link>
              ) : (
                <Nav.Link href="/auth" className="nav-link">
                  LogIn/SignUp
                </Nav.Link>
              )}
              {/* <NavDropdown
              title="Dropdown"
              id={`offcanvasNavbarDropdown-expand-lg`}
            >
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

    // <Navbar collapseOnSelect expand="lg" className="bg-body-primary" >
    // <Container>
    //   <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
    //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   <Navbar.Collapse id="responsive-navbar-nav">
    //     <Nav className="me-auto">
    //     </Nav>
    //     <Nav>
    //       <Nav.Link href="/">Home</Nav.Link>
    //       <Nav.Link href="/pricing">
    //         Pricing
    //       </Nav.Link>
    //       <Nav.Link href="/auth">Login/Signup</Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Container>
    // {/* <nav className="navbar">
    //   <div className="navbar-brand">
    //   <IoMdMenu onClick={toggleNavbar} style={{justifyContent:'center',alignItems:'center'}}/>
    //   AI LMS
    //   </div>
    //   <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
    //   <li>
    //   <Link to="/" onClick={toggleNavbar}>
    //   Home
    //   </Link>
    //   </li>
    //   <li>
    //   <Link to="/pricing" onClick={toggleNavbar}>
    //   Pricing
    //   </Link>
    //   </li>
    //   <li>
    //       <Link to="/auth" onClick={toggleNavbar}>
    //       Login/Signup
    //       </Link>
    //       </li>
    //       </ul>
    //     </nav> */}
  );
}

export default Header;
