import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="home-container">

      {/* 🔥 HERO SECTION */}
      <div className="hero-section">
        <h1>Discover Amazing Stories</h1>
        <p>Read and explore web novels from creators around the world.</p>
      </div>

      {/* 🔥 EMPTY STATE */}
      {novels.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No novels available
        </p>
      )}

      {/* 🔥 NOVEL GRID */}
      <div className="novel-grid">
        {novels.map((novel) => (
          <div
            key={novel.id}
            className="novel-card"
            onClick={() => navigate(`/novel/${novel.id}`)}
          >
            {/* 🎨 CARD IMAGE */}
            <div className="card-image"></div>

            {/* 📄 CARD CONTENT */}
            <div className="card-content">
              <h2>{novel.title}</h2>
              <p>{novel.description}</p>

              {/* 👁️ VIEWS */}
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                👁️ {novel.views || 0} views
              </p>

              {/* 🔘 BUTTON */}
              <button className="read-btn">
                Read →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;