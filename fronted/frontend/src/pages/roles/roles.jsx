import React, { useState, useEffect } from "react";
import "./roles.css";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import BASE_URL from "../../services/api";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");

  const fetchRoles = () => {
    fetch(`${BASE_URL}/roles`, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        setRoles(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error(err);
        setRoles([]);
      });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const addRole = async (e) => {
    e.preventDefault();
    if (!roleName.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({ role_name: roleName })
      });
      const data = await response.json();
      alert(data.message || "Role Added");
      setRoleName("");
      fetchRoles(); // Automatically update the table
    } catch (err) {
      console.error("Failed to add role:", err);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="roles-container">
          <div className="roles-card">
            <div className="roles-header">
              <h2>System Roles Management</h2>
              <p>Configure user hierarchy configurations and access boundaries below.</p>
            </div>
            
            <form onSubmit={addRole} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input 
                type="text"
                placeholder="Enter role name..."
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: 1 }}
              />
              <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Add Role
              </button>
            </form>

            <div className="table-responsive">
              <table className="roles-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Role Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((r, index) => (
                    <tr key={r.id || index}>
                      <td>{r.id || index + 1}</td>
                      <td>{r.role_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roles;