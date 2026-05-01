import { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

function ChapterRead() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/novels/chapter/${id}`)
      .then(res => {
        setChapter(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading chapter...
      </div>
    );
  }

  if (!chapter) {
    return <p style={{ color: "white" }}>Chapter not found</p>;
  }

  return (
    <div style={styles.page}>
      
      {/* 🔙 BACK */}
      <button onClick={() => navigate(-1)} style={styles.back}>
        ← Back
      </button>

      {/* 📖 CONTENT */}
      <div style={styles.reader}>
        <h1 style={styles.title}>{chapter.title}</h1>

        <div style={styles.content}>
          {chapter.content}
        </div>
      </div>

    </div>
  );
}

export default ChapterRead;

const styles = {
  page: {
    background: "#020617",
    minHeight: "100vh",
    padding: "30px 20px",
    color: "#e2e8f0",
  },

  loading: {
    color: "white",
    background: "#020617",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  back: {
    marginBottom: "20px",
    background: "transparent",
    color: "#94a3b8",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },

  reader: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#0f172a",
    padding: "40px",
    borderRadius: "12px",
  },

  title: {
    fontSize: "28px",
    marginBottom: "30px",
    textAlign: "center",
  },

  content: {
    fontSize: "18px",
    lineHeight: "1.9",
    whiteSpace: "pre-line", // 🔥 VERY IMPORTANT
    color: "#cbd5f5",
  },
};