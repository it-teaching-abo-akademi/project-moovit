import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { default as logo } from "../../assets/muuvitLogo.svg";
import "../../styles/FormBase.css";
import { USERSSERVICE } from "../../constants";

const PASSWORD_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 5;

const USERNAME_INVALID_MSG =
    "Username contains invalid characters. Only letters, numbers, underscore(_) and dots(.) are allowed";
const PASSWORD_MISMATCH_MSG = "Passwords do not match.";
const USERNAME_EXISTS_MSG = "The username is already taken.";
const USERNAME_TOO_LONG_MSG = "Username is too long";
const USERNAME_TOO_SHORT_MSG = "Username is too short";

export default function Signup() {
    // Fredi's register code before return ()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordReType, setPasswordReType] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [usernameShort, setUsernameShort] = useState(false);
    const [usernameLong, setUsernameLong] = useState(false);
    const [usernameValid, setUsernameValid] = useState(true);
    const [usernameExists, setUsernameExists] = useState(false);

    const handleRegistration = async (e) => {
        let errorsInFields = false;
        e.preventDefault();

        // Assume no errors in fields.
        setPasswordMatch(true);
        setUsernameValid(true);
        setUsernameShort(false);
        setUsernameLong(false);

        // Check for illegal characters in username.
        if (!/^[\._A-Za-z0-9]+$/.test(username)) {
            setUsernameValid(false);
            errorsInFields = true;
        }

        // Check username length.
        if (username.length < PASSWORD_MIN_LENGTH) {
            setUsernameShort(true);
            errorsInFields = true;
        }
        if (username.length > PASSWORD_MAX_LENGTH) {
            setUsernameLong(true);
            errorsInFields = true;
        }

        // Check that passwords match.
        if (password !== passwordReType) {
            setPasswordMatch(false);
            errorsInFields = true;
        }

        // Terminate if any errors.
        if (errorsInFields) {
            return;
        }
        // Send the registration request
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password }),
        };
        const fetchURL = USERSSERVICE + "/register";
        const response = await fetch(fetchURL, requestOptions);

        // Handle response.
        if (response.status === 400) {
            if ((await response.json()).message) setUsernameExists(true);
        }
        if (response.status === 200) {
            console.log("success");
        } else {
            console.log("error code: " + response.status);
        }
    };

    // Fredi's register code before return ()

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
                                        <h4 className="ps-3">Login</h4>
                                    </div>
                                    <img
                                        src={logo}
                                        width={100}
                                        height={100}
                                        className="rounded mx-auto d-block"
                                        alt="muuvitLogo"
                                    />
                                    <br />
                                    <div className="mb-3">
                                        <Form onSubmit={handleRegistration}>
                                            {/* Username logic begin */}
                                            <Form.Group
                                                className="mb-3"
                                                controlId="Name"
                                            >
                                                <Form.Label className="text-center">
                                                    Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={username}
                                                    onChange={(e) =>
                                                        setUsername(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <p>
                                                    {usernameValid
                                                        ? ""
                                                        : USERNAME_INVALID_MSG}
                                                </p>
                                                <p>
                                                    {usernameExists
                                                        ? USERNAME_EXISTS_MSG
                                                        : ""}
                                                </p>
                                            </Form.Group>

                                            {/* Email address logic begin */}
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicEmail"
                                            >
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                />
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
                                                    type="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <p>
                                                    {usernameLong
                                                        ? USERNAME_TOO_LONG_MSG
                                                        : ""}
                                                </p>
                                                <p>
                                                    {usernameShort
                                                        ? USERNAME_TOO_SHORT_MSG
                                                        : ""}
                                                </p>
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>
                                                    Confirm Password
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    value={passwordReType}
                                                    onChange={(e) =>
                                                        setPasswordReType(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <p>
                                                    {passwordMatch
                                                        ? ""
                                                        : PASSWORD_MISMATCH_MSG}
                                                </p>
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
                                                    Create Account
                                                </Button>
                                            </div>
                                        </Form>

                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account??{" "}
                                                <Link
                                                    to="/login"
                                                    className="text-primary fw-bold"
                                                >
                                                    Sign In
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
