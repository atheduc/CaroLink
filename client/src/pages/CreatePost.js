// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from 'yup';
// import axios from 'axios';
// import '../App.css';
// import { useNavigate } from "react-router-dom";

// function CreatePost() {
//   let navigate = useNavigate();
//     const initialValues = {
//       title: "",
//       postText: "",
//       username: "",
//     };
  
//     const validationSchema = Yup.object().shape({
//       title: Yup.string().required("You must input a Title!"),
//       postText: Yup.string().required(),
//       username: Yup.string().min(3).max(15).required(),
//     });
  
//     const onSubmit = (data) => {
//       axios.post("http://localhost:3001/posts", data).then((response) => {
//         navigate("/");
//       });
//     };

    
//     return (
//       <div className="createPostPage">
//         <Formik
//           initialValues={initialValues}
//           onSubmit={onSubmit}
//           validationSchema={validationSchema}
//         >
//           <Form className="formContainer">
//             <label>Title: </label>
//             <ErrorMessage name="title" component="span" />
//             <Field
//               autocomplete="off"
//               id="inputCreatePost"
//               name="title"
//               placeholder="(Ex. Title...)"
//             />
//             <label>Post: </label>
//             <ErrorMessage name="postText" component="span" />
//             <Field
//               autocomplete="off"
//               id="inputCreatePost"
//               name="postText"
//               placeholder="(Ex. Post...)"
//             />
//             <label>Username: </label>
//             <ErrorMessage name="username" component="span" />
//             <Field
//               autocomplete="off"
//               id="inputCreatePost"
//               name="username"
//               placeholder="(Ex. John123...)"
//             />
  
//             <button type="submit"> Create Post</button>
//           </Form>
//         </Formik>
//       </div>
//     );
//   }
  
//   export default CreatePost;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css';
import { useNavigate } from "react-router-dom";

function CreatePost() {
  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required("Post content is required."),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      navigate("/");
    });
  };

  return (
    <div className="createPostPage">
      <div className="formContainerWrapper">
        <h2>Create a New Post</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <div className="formGroup">
              <label htmlFor="title">Title:</label>
              <Field
                autocomplete="off"
                id="title"
                name="title"
                placeholder="(Ex. Title...)"
                className="inputField"
              />
              <ErrorMessage name="title" component="span" className="errorMessage" />
            </div>
            <div className="formGroup">
              <label htmlFor="postText">Post:</label>
              <Field
                autocomplete="off"
                id="postText"
                name="postText"
                placeholder="(Ex. Post...)"
                className="inputField"
                as="textarea"
              />
              <ErrorMessage name="postText" component="span" className="errorMessage" />
            </div>

            <button type="submit" className="submitButton">Create Post</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreatePost;
