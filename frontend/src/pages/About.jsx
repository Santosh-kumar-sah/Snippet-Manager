import Footer from "../components/Footer";

export default function About() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>About Snippet Manager</h1>

      <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
        Snippet Manager is a full-stack web application that allows users
        to securely save, organize, update, and manage their code snippets.
        It is built to improve developer productivity by keeping reusable
        code easily accessible.
      </p>

      <h2 style={{ marginTop: "30px" }}>✨ Key Features</h2>
      <ul style={{ marginTop: "15px", lineHeight: "1.8" }}>
        <li>User Registration & Authentication</li>
        <li>Create, Update and Delete Snippets</li>
        <li>Organize Snippets into Folders</li>
        <li>Protected Dashboard Access</li>
        <li>Secure Token-Based Authentication</li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>🛠 Tech Stack</h2>
      <ul style={{ marginTop: "15px", lineHeight: "1.8" }}>
        <li>Frontend: React.js</li>
        <li>Backend: Node.js & Express.js</li>
        <li>Database: MongoDB</li>
        <li>Authentication: JWT</li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>🎯 Purpose</h2>
      <p style={{ marginTop: "15px", lineHeight: "1.6" }}>
        This project was developed as a learning-focused full-stack application
        to understand authentication flow, protected routes, state management,
        and REST API integration in a MERN stack environment.
      </p>

      <Footer />
    </div>
  );
}