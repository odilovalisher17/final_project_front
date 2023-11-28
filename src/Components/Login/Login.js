import React, { useState } from "react";
import "./Login.css";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { addLoggedUser } from "../../Store/Reducers/LoggedUserReducer";
import { useAuth } from "../../helpers/AuthContext";

const Login = () => {
  const mode = useSelector((state) => state.modeChanger);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(undefined);

  const handleLogin = async () => {
    try {
      const user = await axios.get(
        `https://final-project-yb3m.onrender.com/api/v1/users/user?email=${email}&password=${password}`
      );
      //console.log(user);
      dispatch(addLoggedUser(user.data.user));
      login();
      setErrMessage(undefined);

      const expiryDate = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toUTCString();
      document.cookie = `authToken=${user.data.user._id}; expires=${expiryDate}; path=/`;

      navigate("/");
    } catch (error) {
      //console.log(error);
      if (error.response && error.response.data) {
        setErrMessage(error.response.data.message);
      }
    }
  };

  return (
    <div
      className={
        mode === "dark" ? "login bg-dark-mode" : "login bg-light-mode"
      }>
      <Container
        style={{
          display: "flex",
          height: "50%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div
          className={
            mode === "dark"
              ? "login-form bg-dark-card"
              : "login-form bg-light-card"
          }>
          <div className="login-header">
            <h3>Login</h3>
          </div>

          {errMessage && (
            <div style={{ textAlign: "center", color: "red" }}>
              {errMessage}
            </div>
          )}

          <div className="login-body">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Don't have an account? </Form.Label>{" "}
                <NavLink to={"/reg"}>Register here!</NavLink>
              </Form.Group>

              <Button
                className="bg-blue"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
