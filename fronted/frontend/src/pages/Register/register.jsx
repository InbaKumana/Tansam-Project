import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    role: "admin"
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
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      alert(data.message || "Registration Successful");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong during registration.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          value={form.name} 
          placeholder="Full Name" 
          onChange={handleChange} 
          required 
        />
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
        <input 
          name="age" 
          type="number" 
          value={form.age} 
          placeholder="Age" 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Sign Up</button>
      </form>
      
      {/* New navigation redirect option */}
      <div className="auth-redirect">
        <p>Already have an account? <span onClick={() => navigate("/login")} className="redirect-link">Login here</span></p>
      </div>
    </div>
  );
}

export default Register;