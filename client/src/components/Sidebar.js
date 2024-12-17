import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

function Sidebar() {
  const { authState } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <Link to="/LegitHome">Home</Link>
      {authState.status && <Link to="/createpost">Create A Post</Link>}
      {!authState.status && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </>
      )}
    </div>
  );
}

export default Sidebar;
