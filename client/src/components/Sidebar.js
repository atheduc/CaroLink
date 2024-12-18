import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

function Sidebar() {
  const { authState } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div class = "margin">
      <Link to="/">🏡  Home</Link></div>
      <div class = "margin">{authState.status && <Link to="/createpost">📢 Create A Post</Link>}
      </div>
      {!authState.status && (
        <>
          <div class = "margin"><Link to="/login">🔒 Login</Link></div>
          <div class = "margin"><Link to="/registration">📝 Registration</Link></div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
