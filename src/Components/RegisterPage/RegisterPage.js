import React, { useState } from "react";
import "./RegisterPage.css";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.modeChanger);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "active",
    role: "user",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.disabled = true;

    if (newUser.password === confirmPassword) {
      const trimmedUser = {};

      Object.entries(newUser).forEach(([key, val]) => {
        trimmedUser[key] = val.trim();
      });

      await axios.post(
        `https://final-project-yb3m.onrender.com/api/v1/users/addUser`,
        trimmedUser
      );

      navigate("/login");
    } else {
      alert("Passwords should match");
    }
  };

  return (
    <div
      className={
        mode === "dark"
          ? "register-page bg-dark-mode"
          : "register-page bg-light-mode"
      }>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <div
          className={
            mode === "dark"
              ? "register-page-card login-form bg-dark-card"
              : "register-page-card login-form bg-light-card"
          }>
          <div className="register-header">
            <h3>Register Form</h3>
          </div>

          <div className="register-body">
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  required
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      firstName: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  required
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      lastName: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
