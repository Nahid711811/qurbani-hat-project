// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { signOut } from "firebase/auth";
// import { auth } from "./firebase.init";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const navigate = useNavigate()

//   const [user, setUser] = useState(null);
//   console.log("USER", user)

//   // 🔥 load user from backend
//   const loadUser = async (email) => {
//     try {
//       const res = await axios.get("http://localhost:5000/me", {
//         headers: { email },
//       });

//       setUser(res.data);
//     } catch (err) {
//       setUser(null);
//     }
//   };

//   // 🔥 auto login on refresh
//   useEffect(() => {
//     const email = sessionStorage.getItem("email");
//     if (!email) {
//       setUser(null);
//       return
//     }

//     loadUser(email)
//   }, []);

//   // logout
// const logout = async () => {
//   await signOut(auth); // 🔥 logout firebase
//   setUser(null);
//   sessionStorage.removeItem("email");
//   navigate("/")
// };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loadUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.init";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 load user from backend
  const loadUser = async (email) => {
    try {
      const res = await axios.get("http://localhost:5000/me", {
        headers: { email },
      });

      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 auto login on refresh
  useEffect(() => {
    const email = sessionStorage.getItem("email");

    if (!email) {
      setUser(null);
      setLoading(false);
      return;
    }

    loadUser(email);
  }, []);

  // 🔥 logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    sessionStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loadUser, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}