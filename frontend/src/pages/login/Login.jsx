import React, { useState } from "react";
import "../../styles/FormBase.css";
import { Link } from "react-router-dom";
import { default as logo } from "../../assets/muuvitLogo.svg";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import { USERSSERVICE } from "../../constants";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        if (validateEmail(email) && validatePassword(password)) {
            try {
                /* const response = await fetch("YOUR_SERVER_ENDPOINT/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }); */

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email, password: password }),
                };
                const fetchURL = USERSSERVICE + "/register";
                const response = await fetch(fetchURL, requestOptions);

                const data = await response.json();

                if (response.ok) {
                    // Assuming the JWT is in data.token
                    Cookies.set("jwt", data.token); // Save the JWT in a cookie
                    console.log("Login successful");
                    // Redirect or perform other actions on successful login
                } else {
                    console.error("Login failed:", data.message);
                    // Handle login failure (show error message, etc.)
                }
            } catch (error) {
                console.error("There was an error logging in:", error);
                // Handle network errors, server down, etc.
            }
        }
    };

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <div class="container d-flex align-items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-arrow-left"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                            />
                                        </svg>{" "}
                                    </div>
                                    <img
                                        src={logo}
                                        width={100}
                                        height={100}
                                        className="rounded mx-auto d-block"
                                        alt="muuvitLogo"
                                    />
                                    <h3>Sign In</h3>
                                    <br />
                                    <div className="mb-3">
                                        <Form
                                            noValidate
                                            validated={validated}
                                            onSubmit={handleSubmit}
                                        >
                                            {/* Email address logic begin */}
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicEmail"
                                            >
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="email"
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    isInvalid={
                                                        validated &&
                                                        !validateEmail(email)
                                                    }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter a valid email
                                                    address.
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            {/* Password logic begin */}
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    isInvalid={
                                                        validated &&
                                                        !validatePassword(
                                                            password
                                                        )
                                                    }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter a password that
                                                    is at least 8 characters
                                                    long.
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>

                                            <div className="d-grid">
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                >
                                                    Sign in
                                                </Button>
                                            </div>
                                        </Form>
                                        <br />

                                        <div className="mb-2">
                                            <input
                                                type="checkbox"
                                                className="custom-control custom-checkbox"
                                                id="check"
                                            />
                                            <label
                                                htmlFor="check"
                                                className="custom-input-label ms-2"
                                            >
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                {/* Forget password?{" "} */}
                                                <Link
                                                    to="/login"
                                                    className="text-primary fw-bold"
                                                >
                                                    Forget password?
                                                </Link>
                                            </p>
                                        </div>

                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                No account yet?{" "}
                                                <Link
                                                    to="/signup"
                                                    className="text-primary fw-bold"
                                                >
                                                    Sign up
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
