import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { LoginContext } from '../context/LoginContext.js';
import '../styles/Navbar.css'

const Navigation = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    
    const logout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
    }

    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#4488FF"}}>
            <div className="container">
                <Link to="/" className="navbar-brand">BizReady</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item px-4">
                            <NavLink to="/blog" className="nav-link nav-link1">Blog</NavLink>
                        </li>
                        <li className="nav-item px-4">
                            <NavLink to="/feed" className="nav-link nav-link2">Explore</NavLink>
                        </li>
                        <li className="nav-item px-4">
                            <NavLink to="/feed" className="nav-link nav-link3">About us</NavLink>
                        </li>
                        <li className="nav-item px-4">
                            <NavLink to="/feed" className="nav-link nav-link4">Community</NavLink>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item px-4">
                                    <NavLink to="/profile-details" className="nav-link nav-link5">Profile</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link nav-link6" onClick={logout}>Logout</NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link nav-link7">Login</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
