


import { useEffect, useState } from "react";
import api from "../api/axios";

const Admin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setData(res.data);
      } catch (err) {
        console.log(err.response); 
        setError(
          err.response?.data?.message || "Failed to load admin dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <h2>Loading admin dashboard...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      <div style={cardStyle}>
        <h3>Admin Info</h3>
        <p><strong>ID:</strong> {data?.admin?.id}</p>
        <p><strong>Email:</strong> {data?.admin?.email}</p>
        <p><strong>Role:</strong> {data?.admin?.role}</p>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#f5f5f5",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

export default Admin;