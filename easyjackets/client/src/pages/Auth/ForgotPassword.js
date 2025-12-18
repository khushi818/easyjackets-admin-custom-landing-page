import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css"; // Ensure this contains relevant styles

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce Jackets"}>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Reset Password</h2>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8"> {/* Adjusted column size for width */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="email"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="answer">Secret Answer</label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="answer"
                  placeholder="Enter Your Secret Answer"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  id="newPassword"
                  placeholder="Enter Your New Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Reset
              </button>
              <div className="mt-3 text-center">
                <small>
                  Remembered your password?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login here
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
