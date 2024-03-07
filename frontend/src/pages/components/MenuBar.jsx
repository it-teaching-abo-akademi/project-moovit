import React from "react";
import "./MenuBar.css"
import { Link } from "react-router-dom";

const MenuBar = () => {
    return (
        <div id="menu-bar">
            <Link to="/">
            <i className="bi bi-house"></i> 
            </Link>
            <Link to="/events/search">
            <i className="bi bi-search"></i> 
            </Link>
            <Link to="/profile">
            <i className="bi bi-person"></i> 
            </Link>
        </div>
    );
}
export default MenuBar;
