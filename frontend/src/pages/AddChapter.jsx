import { useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

function AddChapter() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { id } = useParams(); // 👈 novelId

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/novels/chapter/add",
        {
          title,
          content,
          novelId: parseInt(id),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Chapter added!");
      navigate(`/novel/${id}`);
    } catch (err) {
      console.log(err);
      alert("Error adding chapter");
    }
  };

  return (
    <div style={{
      padding: "30px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>Add Chapter</h1>

      <input
        placeholder="Chapter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
      />

      <textarea
        placeholder="Chapter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px", height: "150px" }}
      />

      <button onClick={handleAdd}>
        Add Chapter
      </button>
    </div>
  );
}

export default AddChapter;