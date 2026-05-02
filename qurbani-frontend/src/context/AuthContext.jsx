import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log("USER", user)

  // 🔥 load user from backend
  const loadUser = async (email) => {
    try {
      const res = await axios.get("http://localhost:5000/me", {
        headers: { email },
      });

      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  // 🔥 auto login on refresh
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      setUser(null);
      return
    }

    loadUser(email)
  }, []);

  // logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}