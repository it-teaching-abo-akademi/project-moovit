import React, { useState } from "react";
import {USERSSERVICE} from "../constants";

const PASSWORD_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 5;

const USERNAME_INVALID_MSG =
    "Username contains invalid characters. Only letters, numbers, underscore(_) and dots(.) are allowed";
const PASSWORD_MISMATCH_MSG = "Passwords do not match.";
const USERNAME_EXISTS_MSG = "The username is already taken.";
const USERNAME_TOO_LONG_MSG = "Username is too long";
const USERNAME_TOO_SHORT_MSG = "Username is too short";

const RegistrationPage = () => {
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

    return (
        <div>
            <h2>Registration Page</h2>
            <form onSubmit={handleRegistration}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p>{usernameValid ? "" : USERNAME_INVALID_MSG}</p>
                    <p>{usernameExists ? USERNAME_EXISTS_MSG : ""}</p>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p>{usernameLong ? USERNAME_TOO_LONG_MSG : ""}</p>
                    <p>{usernameShort ? USERNAME_TOO_SHORT_MSG : ""}</p>
                </div>
                <div>
                    <label>Re-type Password:</label>
                    <input
                        type="password"
                        value={passwordReType}
                        onChange={(e) => setPasswordReType(e.target.value)}
                    />
                    <p>{passwordMatch ? "" : PASSWORD_MISMATCH_MSG}</p>
                </div>
                <p>HFHF</p>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
