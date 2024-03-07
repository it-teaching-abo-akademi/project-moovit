import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./profile.css";
import { USERSSERVICE } from "../../constants";
import { useResolvedPath } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
    const token = Cookies.get("jwt");
    if (!token) {
        window.location = "/login";
    }
    
    const [user, setUser] = useState({
        username: "",
        email: "",
        createdAt: "",
    });
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    
    useEffect(() => {
        const token = Cookies.get("jwt");

        if (token) {
            const userId = jwtDecode(token).subject;
            var url = USERSSERVICE + "/getUser/" + userId;

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`,
                        );
                    }
                    return response.json();
                })
                .then((userData) => {
                    setUser({
                        username: userData.username,
                        email: userData.email,
                        createdAt: new Date(
                            userData.createdAt,
                        ).toLocaleDateString(),
                    });
                })
                .catch((error) =>
                    console.error("Error fetching user data:", error),
                );
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("jwt");
        setIsLoggedIn(false);
        // Add additional logout operations here
    };

    // Redirect or update UI based on isLoggedIn
    if (!isLoggedIn) {
        window.location.href = "/";
    }

    return (
        <div
            className="d-flex"
            style={{
                padding: "30px 20px 10px 10px",
                background:
                    "linear-gradient(120deg, rgba(255,205,210,1) 0%, rgba(242,72,85,1) 100%)",
            }}
        >
            <div className="heading">
                <h1>Name: {user.username}</h1>
                <h2>Email Address: {user.email}</h2>
                <h3>Join Date: {user.createdAt}</h3>
                <button
                    style={{
                        color: "white",
                        backgroundColor: "#30306d",
                        borderRadius: "10px",
                        marginTop: "5px",
                        marginBottom: "5px",
                        width: "50%",
                        border: "none",
                        padding: "10px",
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
