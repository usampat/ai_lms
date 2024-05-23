import { useState } from "react";
import { toast } from "react-toastify";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "./Auth.css";
import Header from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const demoUsers = {
  students: [
    { id: 1, username: "student1", password: "pwd1" },
    { id: 2, username: "student2", password: "pwd2" },
  ],
  teachers: [
    { id: 1, username: "teacher1", password: "pwd1" },
    { id: 2, username: "teacher2", password: "pwd2" },
  ],
};

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  function setLoggedInUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify({ user }));
    localStorage.setItem("auth", "true");
  }

  const handleAuth = () => {
    if (isLogin) {
      const user = demoUsers[role === "student" ? "students" : "teachers"].find(
        (user) => user.username === username && user.password === password,
      );
      if (user) {
        setLoggedInUser({ username, role });
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
        localStorage.setItem("auth", false);
      }
    } else {
      const newUser = { id: Date.now(), username, password };
      demoUsers[role === "student" ? "students" : "teachers"].push(newUser);
      setLoggedInUser({ username, role });
      toast.success("Signup successful!");
      navigate("/dashboard");
    }
    setUsername("");
    setPassword("");
  };
  const handleChange = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      <Header />
      <Container className="box">
        <Row className="toggle-row">
          <ToggleButtonGroup
            type="checkbox"
            value={isLogin}
            onChange={handleChange}
          >
            <ToggleButton id="tbg-btn-1" value={true} variant="outline-primary">
              Login
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-2"
              value={false}
              variant="outline-primary"
            >
              Register
            </ToggleButton>
          </ToggleButtonGroup>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth();
            }}
            className="form"
          >
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Form.Select>
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Username/Email</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button variant="primary" type="submit">
                {isLogin ? "LogIn" : "Signup"}
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default Auth;
