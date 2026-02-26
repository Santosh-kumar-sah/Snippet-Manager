import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <footer style={{ padding: "20px", textAlign: "center" }}>
      <Link to="/about">About Us</Link>

      {token && (
        <>
          {" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </footer>
  );
}