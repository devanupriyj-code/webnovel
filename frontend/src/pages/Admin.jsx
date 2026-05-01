import { useEffect, useState } from "react";
import api from "../api";

function Admin() {
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    fetchNovels();
  }, []);

  const fetchNovels = async () => {
    const res = await api.get("/novels");
    setNovels(res.data);
  };

  const deleteNovel = async (id) => {
    const token = localStorage.getItem("token");

    await api.delete(`/novels/delete/${id}`, {
      headers: { Authorization: token }
    });

    setNovels(novels.filter(n => n.id !== id));
  };

  return (
    <div style={{
      padding: "30px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>⚙️ Admin Dashboard</h1>

      {novels.map(novel => (
        <div key={novel.id} style={{
          background: "#1e293b",
          padding: "15px",
          marginBottom: "15px",
          borderRadius: "10px"
        }}>
          <h2>{novel.title}</h2>
          <p>{novel.description}</p>
          <p style={{ color: "#94a3b8" }}>
  👁️ Views: {novel.views}
</p>

          <button onClick={() => deleteNovel(novel.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;