import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider
} from "../../firebase";
import { useNavigate } from "react-router-dom";
import CoffeeLoader from "../CoffeeLoader/CoffeeLoader.jsx";
import Header from "../Header/Header.jsx";
import "./Login.css";

import loginBackground from "/public/Background- login..png";
import signupBackground from "/public/Background2 - login.png";
import headerBackground from "/public/ceter-login.png";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(loginBackground);
  const navigate = useNavigate();

  useEffect(() => {
    // Set background based on auth mode
    setBackgroundImage(isLogin ? loginBackground : signupBackground);
    
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setError("You are already logged in with this account.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });

    return () => unsubscribe();
  }, [navigate, isLogin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleAuthMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setError("");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      setIsTransitioning(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isLogin) {
      // Validate passwords match for signup
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password should be at least 6 characters");
        setLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        // Login logic
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } else {
        // Signup logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        await updateProfile(userCredential.user, {
          displayName: formData.fullName
        });
      }

      setShowLoader(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      // Custom error messages
      if (error.code === "auth/wrong-password") {
        setError("Your password is incorrect.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError("");

    try {
      await signInWithPopup(auth, provider);
      setShowLoader(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (showLoader) {
    return <CoffeeLoader />;
  }

  return (
    <div 
      className="login-page" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="background-overlay"></div>
      <Header cartItems={0} />
      <div className="auth-container">
        <div className="auth-card hackerrank-style">
        <div 
            className="auth-header"
            style={{ backgroundImage: `url(${headerBackground})`, }}
          >
           
             </div>

          <div
            className={`auth-form-section ${
              isTransitioning ? "fade-out" : "fade-in"
            }`}
          >
            <h3 className="auth-title">
              {isLogin ? "Log in to your account" : "Create your account"}
            </h3>
            <p className="auth-description">
              {isLogin
                ? "Be part of our community of coffee enthusiasts"
                : "Join our community of coffee enthusiasts"}
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="error-message">{error}</div>}

              {!isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    required={!isLogin}
                  />
                </div>
              )}

              {!isLogin && (
                <div className="terms-agreement">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    I agree to 'The Mug's' Terms of Service and Privacy Policy
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="auth-button primary"
                disabled={loading}
              >
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Creating account..."
                  : isLogin
                  ? "Log in"
                  : "Sign up"}
              </button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-buttons">
              <button
                onClick={() => handleSocialLogin(googleProvider)}
                className="social-button google"
                disabled={loading}
              >
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path
                    fill="#DB4437"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
                    1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
                    3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#0F9D58"
                    d="M12 23c2.97 0 5.46-.98 
                    7.28-2.66l-3.57-2.77c-.98.66-2.23 
                    1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
                    20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#F4B400"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
                    8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#4285F4"
                    d="M12 5.38c1.62 0 
                    3.06.56 4.21 1.64l3.15-3.15C17.45 
                    2.09 14.97 1 12 1 7.7 1 3.99 3.47 
                    2.18 7.07l3.66 2.84c.87-2.6 
                    3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="auth-footer">
              <p>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  className="auth-mode-toggle"
                  onClick={toggleAuthMode}
                  disabled={loading}
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}