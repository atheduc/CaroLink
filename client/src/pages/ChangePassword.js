// import React, { useState } from "react";
// import axios from "axios";

// function ChangePassword() {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const changePassword = () => {
//     axios
//       .put(
//         "http://localhost:3001/auth/changepassword",
//         {
//           oldPassword: oldPassword,
//           newPassword: newPassword,
//         },
//         {
//           headers: {
//             accessToken: localStorage.getItem("accessToken"),
//           },
//         }
//       )
//       .then((response) => {
//         if (response.data.error) {
//           alert(response.data.error);
//         }
//       });
//   };

//   return (
//     <div>
//       <h1>Change Your Password</h1>
//       <input
//         type="text"
//         placeholder="Old Password..."
//         onChange={(event) => {
//           setOldPassword(event.target.value);
//         }}
//       />
//       <input
//         type="text"
//         placeholder="New Password..."
//         onChange={(event) => {
//           setNewPassword(event.target.value);
//         }}
//       />
//       <button onClick={changePassword}> Save Changes</button>
//     </div>
//   );
// }

// export default ChangePassword;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";  // Import AuthContext

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);  // Access setAuthState from context
    
  const changePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Password changed successfully!");

          // Log out by removing the access token
          localStorage.removeItem("accessToken");

          // Immediately update authState to reflect logout
          setAuthState({
            username: "",
            id: 0,
            status: false,
          });

          // Redirect to the login page
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  return (
    <div>
      <h1>Change Your Password</h1>
      <input
        type="text"
        placeholder="Old Password..."
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="New Password..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button onClick={changePassword}>Save Changes</button>
    </div>
  );
}

export default ChangePassword;
