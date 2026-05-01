import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AddNovel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/novels/add",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Novel added successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error adding novel");
    }
  };

  return (
    <div style={{
      padding: "30px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>Add New Novel</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
      />

      <button onClick={handleAdd}>
        Add Novel
      </button>
    </div>
  );
}

export default AddNovel;