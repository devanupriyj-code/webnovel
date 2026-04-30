import { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

function Chapters() {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/novels/${id}/chapters`)
      .then(res => {
        setChapters(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [id]);

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <button onClick={() => navigate("/")}>⬅ Back</button>
      <h1>📖 Chapters</h1>

      {chapters.length === 0 && <p>No chapters yet</p>}

      {chapters.map((ch) => (
        <div
          key={ch.id}
          onClick={() => navigate(`/chapter/${ch.id}`)}
          style={{
            background: "#1e293b",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          {ch.title}
        </div>
      ))}
    </div>
  );
}

export default Chapters;