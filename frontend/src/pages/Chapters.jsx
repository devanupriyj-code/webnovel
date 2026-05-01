import { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

function Chapters() {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get(`/novels/${id}/chapters`)
      .then(res => {
        setChapters(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="chapters-container">

      {/* 🔙 BACK */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* 📖 HEADER */}
      <div className="chapters-header">
        <h1>📖 Chapters</h1>

        {token && (
          <button
            className="add-btn"
            onClick={() => navigate(`/add-chapter/${id}`)}
          >
            + Add Chapter
          </button>
        )}
      </div>

      {/* 📭 EMPTY STATE */}
      {chapters.length === 0 && (
        <div className="empty-state">
          <h2>No chapters yet</h2>
          <p>Start writing your story by adding the first chapter.</p>

          {token && (
            <button
              className="add-btn large"
              onClick={() => navigate(`/add-chapter/${id}`)}
            >
              + Add First Chapter
            </button>
          )}
        </div>
      )}

      {/* 📚 CHAPTER LIST */}
      <div className="chapter-list">
        {chapters.map((ch, index) => (
          <div
            key={ch.id}
            className="chapter-card"
            onClick={() => navigate(`/chapter/${ch.id}`)}
          >
            <span className="chapter-number">
              Chapter {index + 1}
            </span>
            <h3>{ch.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chapters;