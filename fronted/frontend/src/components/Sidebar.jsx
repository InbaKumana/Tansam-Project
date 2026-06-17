import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevents page reload or anchor jumps
    
    // Clear session storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Redirect back to registration
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h3>Admin Panel</h3>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/users">Users</Link>
      <Link to="/admins">Admins</Link>
      <Link to="/roles">Roles</Link>
      <Link to="/settings">Settings</Link>
      
      {/* Logout placed naturally directly under settings */}
      <span onClick={handleLogout} className="sidebar-logout">
        Logout
      </span>
    </div>
  );
}

export default Sidebar;