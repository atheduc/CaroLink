import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "./ChangePassword.css"; // Import CSS for styling

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const changePassword = () => {
    if (!oldPassword || !newPassword) {
      alert("Please fill in both fields!");
      return;
    }

    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        { oldPassword, newPassword },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Password changed successfully!");
          localStorage.removeItem("accessToken");
          setAuthState({ username: "", id: 0, status: false });
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  return (
    <div className="changePasswordContainer">
      <div className="changePasswordCard">
        <h1>Change Your Password</h1>
        <div className="inputGroup">
          <label>Old Password</label>
          <input
            type="password"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button className="saveButton" onClick={changePassword}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
