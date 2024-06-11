import { useState } from "react";
import { toast } from "react-toastify";
import {
  Form,
  Container,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "./Auth.css";
import Header from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Background from "../../components/background/Background";

const BASE_URL = "http://localhost:4000";
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setIsLogin(value);
  };

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await loginUser({ username, password });
      } else {
        await registerUser({ email, username, password, role });
      }
    } catch (error) {
      toast.error("Authetication Failed!");
      console.log(error);
    }
  };

  const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (data.status == "true") toast.success(data.message);
    else toast.error(data.message);

    localStorage.setItem("jwtToken", data.body.token);
    navigate("/dashboard");
  };

  const registerUser = async (userInfo) => {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();
    if (data.status == "true") toast.success(data.message);
    else toast.error(data.message);
  };

  return (
    <>
      <Header />
      <Container className="auth">
        <Background />
        <div className="toggle-row">
          <ToggleButtonGroup
            type="radio"
            name="authType"
            value={isLogin}
            onChange={handleChange}
            style={{ height: "40px" }}
          >
            <ToggleButton
              className="toggle-button"
              id="tbg-btn-1"
              value={true}
              variant="outline-success"
            >
              Login
            </ToggleButton>
            <ToggleButton
              className="toggle-button"
              id="tbg-btn-2"
              value={false}
              variant="outline-success"
            >
              Register
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="form-row">
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
                className="role-select"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </Form.Select>
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="name-input"
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="username-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="password-input"
              />
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="success"
                style={{ border: "none" }}
                type="submit"
              >
                {isLogin ? "LogIn" : "Signup"}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Auth;
