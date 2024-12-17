// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// function Registration() {
//   const initialValues = {
//     username: "",
//     password: "",
//   };

//   const validationSchema = Yup.object().shape({
//     username: Yup.string().min(3).max(15).required(),
//     password: Yup.string().min(4).max(20).required(),
//   });

//   const onSubmit = (data) => {
//     axios.post("http://localhost:3001/auth", data).then(() => {
//       console.log(data);
//     });
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form className="formContainer">
//           <label>Username: </label>
//           <ErrorMessage name="username" component="span" />
//           <Field
//             autocomplete="off"
//             id="inputCreatePost"
//             name="username"
//             placeholder="(Ex. John123...)"
//           />

//           <label>Password: </label>
//           <ErrorMessage name="password" component="span" />
//           <Field
//             autocomplete="off"
//             type="password"
//             id="inputCreatePost"
//             name="password"
//             placeholder="Your Password..."
//           />

//           <button type="submit"> Register</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default Registration;


import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../Login.css";  // Import the updated CSS file

function Registration() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [successMessage, setSuccessMessage] = useState(""); // State to track success message

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data)
      .then((response) => {
        // On successful registration
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after a short delay
        }, 2000); // 2 seconds delay before navigation
      })
      .catch((error) => {
        console.error("There was an error registering:", error);
        setSuccessMessage("Registration failed. Please try again.");
      });
  };

  // Navigate to the login page manually if needed
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="registrationContainer">
      <div className="registrationForm">
        <h2>Register</h2>

        {successMessage && (
          <div className="successMessage">{successMessage}</div> // Display success or error message
        )}

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Username:</label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              name="username"
              placeholder="(Ex. John123...)"
            />

            <label>Password:</label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              name="password"
              placeholder="Your Password..."
            />

            <button type="submit">Register</button>
          </Form>
        </Formik>
        
        {/* Login Link */}
        <p className="registerLink" onClick={goToLogin}>
          Already have an account? <span>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default Registration;
