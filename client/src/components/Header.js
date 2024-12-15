import React, { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className="header">
      <div className="header-left">
        <h1 className="logo" onClick={() => navigate("/")}>
          CaroLink
        </h1>
      </div>

      <div className="header-right">
        {authState.status && (
          <>
            <span
              className="username"
              onClick={() => navigate(`/profile/${authState.id}`)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {authState.username}
            </span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
