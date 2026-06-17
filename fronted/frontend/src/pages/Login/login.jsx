import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid Credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Failed to connect to the authentication server.");
    }
  };

  return (
    <div className="login-container"> 
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          type="email" 
          value={form.email} 
          placeholder="Email Address" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          value={form.password} 
          placeholder="Password" 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>

      {/* New navigation redirect option */}
      <div className="auth-redirect">
        <p>Don't have an account? <span onClick={() => navigate("/")} className="redirect-link">Register here</span></p>
      </div>
    </div>
  );
}

export default Login;