import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import googleLogo from "../assests/google.png";
import mockImage from "../assests/mock.jpg";
import "../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../controllers/LoginController";
import Spinner from "./Spinner";
import { LoginContext } from "../context/LoginContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserLogin = async (e) => {
    setLoading(true); // Set loading to true before making the API call
    try {
      console.log("Email:", email);
      console.log("Password:", password);
      const userData = {
        emailId: email,
        password: password,
      };
      const response = await loginUser(userData);
      alert(response.message);
      sessionStorage.setItem("token", response.token);
      // Additional logic after successful login, if needed
      console.log("User logged in successfully!", response);
      setIsLoggedIn(true);
      navigate("/investors");
    } catch (error) {
      alert(error.message);
      console.error("Error logging in:", error.message);
      // Additional error handling logic if needed
    } finally {
      setLoading(false); // Set loading back to false after the API call completes
    }
  };

  return (
    <div class="form-wrapper">
      <div class="form-side animate_animated animate_fadeIn">
        <form class="my-form">
          <div class="form-welcome-row">
            <h1>Welcome</h1>
            <h2>Login to your account!</h2>
          </div>

          <div class="text-field">
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div class="text-field">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              title="Minimum 6 characters at least 1 Alphabet and 1 Number"
              pattern="^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{6,}$"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button
            style={{ display: loading ? "none" : "block" }}
            onClick={handleUserLogin}
            type="button"
            class="btn btn-dark"
          >
            Login
          </button>
          <div
            class="spinner"
            style={{
              margin: "auto",
              justifyContent: "center",
              display: loading ? "block" : "none",
            }}
          >
            <Spinner />
          </div>

          <div class="my-form__actions">
            <NavLink
              to="/Signup"
              class={({ isActive }) =>
                `${isActive ? "active-nav" : null} nav-link`
          }
        >
            <a title="Create Account" class="create-account-link">
              Don't have an account? <strong>Sign Up</strong>
            </a>
          </NavLink>
      </div>

      <div class="divider">
        <div class="divider-line"></div>
        <span>OR</span>
        <div class="divider-line"></div>
      </div>
      <div class="socials-row">
        <a className="socials-sec" href="/" title="Use Google">
          <img src={googleLogo} alt="Google" />
          <span>Continue with Google</span>
        </a>
      </div>
    </form>
  </div >
</div >

  );
};
export default LoginForm;