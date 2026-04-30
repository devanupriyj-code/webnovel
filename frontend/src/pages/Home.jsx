import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔐 check login
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/novels")
      .then(res => {
        setNovels(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    window.location.reload();
  };

  if (loading) {
    return (
      <div style={{ color: "white", background: "#0f172a", minHeight: "100vh" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      padding: "20px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      
      {/* 🔥 NAVBAR */}
      <div style={{ marginBottom: "20px" }}>
        {!token ? (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {token && (
  <>
    <button onClick={() => navigate("/add-novel")}>
      Add Novel
    </button>
    <button onClick={handleLogout}>Logout</button>
  </>
)}
      </div>

      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        📚 Webnovels
      </h1>

      {/* 🔥 EMPTY STATE */}
      {novels.length === 0 && <p>No novels available</p>}

      {/* 🔥 NOVEL LIST */}
      <div style={{ display: "grid", gap: "20px" }}>
        {novels.map((novel) => (
          <div
            key={novel.id}
            onClick={() => navigate(`/novel/${novel.id}`)}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#334155")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#1e293b")
            }
          >
            <h2>{novel.title}</h2>
            <p style={{ color: "#94a3b8" }}>
              {novel.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;