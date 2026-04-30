import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AddNovel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post("/novels/add", {
        title,
        description,
      });

      alert("Novel added!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error adding novel");
    }
  };

  return (
    <div style={{
      padding: "20px",
      background: "#0f172a",
      color: "white",
      minHeight: "100vh"
    }}>
      <h1>Add Novel</h1>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddNovel;