import { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

function ChapterRead() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/novels/chapter/${id}`)
      .then(res => setChapter(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!chapter) {
    return (
      <div style={{ color: "white", background: "#0f172a", minHeight: "100vh" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      padding: "40px",
      maxWidth: "700px",
      margin: "auto",
      background: "#0f172a",
      color: "white",
      minHeight: "100vh"
    }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <h1>{chapter.title}</h1>
      <p style={{ lineHeight: "1.8", marginTop: "20px" }}>
        {chapter.content}
      </p>
    </div>
  );
}

export default ChapterRead;