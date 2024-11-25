
// import { createContext } from "react";

// export const AuthContext = createContext("");




// import { createContext, useState } from "react";

// // Create a context for authentication state
// export const AuthContext = createContext({
//   authState: false,
//   setAuthState: () => {},
// });

// // AuthProvider component to wrap your app and provide context
// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState(false); // Default is not authenticated

//   return (
//     <AuthContext.Provider value={{ authState, setAuthState }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };






import { createContext, useState } from "react";

// Create a context for authentication state
export const AuthContext = createContext({
  authState: false,
  setAuthState: () => {},
});

// AuthProvider component to wrap your app and provide context
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(false); // Default is not authenticated

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

