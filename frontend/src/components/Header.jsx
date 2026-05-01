import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let user = null;

  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      user = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div style={styles.navbar}>
      
      {/* 🔥 LOGO */}
      <h2
        style={styles.logo}
        onClick={() => navigate("/")}
      >
        📚 Webnovels
      </h2>

      {/* 🔥 ACTIONS */}
      <div style={styles.actions}>
        {token && user?.role === "ADMIN" && (
          <button
            onClick={() => navigate("/admin")}
            style={styles.primaryBtn}
          >
            Admin Panel
          </button>
        )}

        {token && (
          <button
            onClick={() => navigate("/add-novel")}
            style={styles.primaryBtn}
          >
            + Add Novel
          </button>
        )}

        {!token ? (
          <>
            <Link to="/login" style={styles.outlineBtn}>Login</Link>
            <Link to="/register" style={styles.primaryBtn}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.outlineBtn}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    background: "#020617",
  },

  logo: {
    cursor: "pointer",
    color: "white",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  primaryBtn: {
    padding: "10px 15px",
    background: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  outlineBtn: {
    padding: "10px 15px",
    background: "transparent",
    color: "white",
    border: "1px solid #334155",
    borderRadius: "8px",
    cursor: "pointer",
  },
};