import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button, Offcanvas } from "react-bootstrap";
import { IoMdMenu } from "react-icons/io";

import "./Navbar.css";
const BASE_URL = "http://localhost:4000";
function Header({ toggleSidebar, dashboard, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return;
    }

    const checkAuth = async () => {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log(response);
        navigate("/");
      }

      const data = await response.json();
      setLogin(true);

      if (setUser) setUser(data.body.user);
    };
    checkAuth();
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
        {console.log(role)}
        {dashboard && !isMobileView && (
          <button onClick={toggleSidebar} className="sidebar-icon">
            <IoMdMenu color="white" />
          </button>
        )}
        {/* {console.log(localStorage.getItem('loggedInUser').length)} */}
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
              <Nav.Link href="/" className="nav-link">
                Home
              </Nav.Link>
              {isMobileView && role === "teacher" && (
                <>
                  <Link
                    to="/makequiz"
                    className="nav-link"
                    onClick={toggleNavbar}
                  >
                    Make Quiz
                  </Link>
                  <Link
                    to="/makeassignment"
                    className="nav-link"
                    onClick={toggleNavbar}
                  >
                    Make Assignments
                  </Link>
                </>
              )}
              {isMobileView && (
                <>
                  <Link to="/quiz" className="nav-link" onClick={toggleNavbar}>
                    Quiz
                  </Link>
                  <Link
                    to="/assignments"
                    className="nav-link"
                    onClick={toggleNavbar}
                  >
                    Assignments
                  </Link>
                  <Link
                    to="/result"
                    className="nav-link"
                    onClick={toggleNavbar}
                  >
                    Results
                  </Link>
                  <Link to="/chat" className="nav-link" onClick={toggleNavbar}>
                    Chat
                  </Link>
                </>
              )}

              <Nav.Link href="/pricing">Pricing</Nav.Link>
              {login ? (
                <Nav.Link
                  onClick={handleLogOut}
                  className="nav-link highlighted"
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link href="/auth" className="nav-link highlighted">
                  Login / Singup
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
