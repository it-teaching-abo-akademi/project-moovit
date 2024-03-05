import React, { useState } from "react";
import { Button, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { default as logo } from "../../assets/muuvitLogo.svg";
import "../../styles/FormBase.css";
import { USERSSERVICE } from "../../constants";
import BackButton from "../components/BackButton";

const PASSWORD_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 5;

const USERNAME_INVALID_MSG =
    "Username contains invalid characters. Only letters, numbers, underscore(_) and dots(.) are allowed";
const PASSWORD_MISMATCH_MSG = "Passwords do not match.";
const USERNAME_EXISTS_MSG = "The username is already taken.";
const USERNAME_TOO_LONG_MSG = "Username is too long";
const USERNAME_TOO_SHORT_MSG = "Username is too short";
const EMAIL_INVALID = "E-mail address is not valid";

export default function Signup() {
    const navigateTo = useNavigate();
    // Fredi's register code before return ()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordReType, setPasswordReType] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [usernameShort, setUsernameShort] = useState(false);
    const [usernameLong, setUsernameLong] = useState(false);
    const [usernameValid, setUsernameValid] = useState(true);
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const handleRegistration = async (e) => {
        let errorsInFields = false;
        e.preventDefault();

        // Assume no errors in fields.
        setPasswordMatch(true);
        setUsernameValid(true);
        setUsernameShort(false);
        setUsernameLong(false);
        setEmailValid(false);

        // Check for illegal characters in username.
        if (!/^[._A-Za-z0-9]+$/.test(username)) {
            setUsernameValid(false);
            errorsInFields = true;
        }

        // Check for invalid email.
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailValid(false);
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
            console.log("errors in fields");
            return;
        }
        // Send the registration request
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        };
        const fetchURL = USERSSERVICE + "/register";
        const response = await fetch(fetchURL, requestOptions);

        // Handle response.
        if (response.status === 400) {
            if ((await response.json()).message) setUsernameExists(true);
        }
        if (response.status === 201) {
            navigateTo("/login");
            console.log("success");
        } else {
            console.log("error code: " + response.status);
            console.log(response.message);
        }
    };

    // Fredi's register code before return ()

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
                                <BackButton navigateTo="/login" /> <br />
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
                                            User Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter User Name"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
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

                                    {/* Email address logic NOT LOGIC begin */}
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label className="text-center">
                                            Email Address
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email Address"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        <p>{emailValid ? EMAIL_INVALID : ""}</p>
                                    </Form.Group>

                                    {/* Password logic begin */}
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
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
                                                    e.target.value,
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
                                            style={{
                                                color: "white",
                                                backgroundColor: "#30306d",
                                                borderRadius: "10px",
                                                border: "none",
                                            }}
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
            </Container>
        </div>
    );
}
