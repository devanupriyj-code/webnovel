import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    window.location.reload();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">

      {/* 🔥 NAVBAR */}
      <div className="navbar">
        <h2 className="logo">📚 Webnovels</h2>

        <div className="nav-actions">
          {!token ? (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/add-novel")} className="btn-primary">
                + Add Novel
              </button>
              <button onClick={handleLogout} className="btn-outline">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🔥 HEADER */}
      <div className="hero-section">
        <h1>Discover Amazing Stories</h1>
        <p>Read and explore web novels from creators around the world.</p>
      </div>

      {/* 🔥 NOVELS */}
      <div className="novel-grid">
        {novels.length === 0 && <p>No novels available</p>}

        {novels.map((novel) => (
          <div
  key={novel.id}
  className="novel-card"
  onClick={() => navigate(`/novel/${novel.id}`)}
>
  <div className="card-image"></div>

  <div className="card-content">
    <h2>{novel.title}</h2>
    <p>{novel.description}</p>

    <button className="read-btn">Read →</button>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}

export default Home;