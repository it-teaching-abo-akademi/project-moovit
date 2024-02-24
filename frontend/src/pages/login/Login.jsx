import React, { useState } from "react";
import "../../styles/FormBase.css";
import { Link } from "react-router-dom";
import { default as logo } from "../../assets/muuvitLogo.svg";
import { Button, Container, Card, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import BackButton from "../components/BackButton";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
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
                const response = await fetch("YOUR_SERVER_ENDPOINT/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

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
        <div
            style={{
                marginTop: "30px",
                marginBottom: "20px",
                marginLeft: "10px",
                marginRight: "10px",
            }}
        >
            <Container>
                <Card>
                    <Card.Body>
                        <div className="mb-3 mt-md-4 form-width-control">
                            <div>
                                <BackButton navigateTo="/" /> <br />
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
                                            Please enter a valid email address.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Password logic begin */}
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            isInvalid={
                                                validated &&
                                                !validatePassword(password)
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a password that is at
                                            least 8 characters long.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCheckbox"
                                    ></Form.Group>

                                    <div className="d-grid">
                                        <Button
                                            style={{
                                                backgroundColor: "#30306d",
                                                border: "none",
                                            }}
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
            </Container>
        </div>
    );
}
