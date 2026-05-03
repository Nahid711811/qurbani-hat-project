import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.init";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async (email) => {
    try {
      const res = await axios.get("https://qubani-backend.vercel.app/me", {
        headers: { email },
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");

    const initAuth = async () => {
      if (email) {
        await loadUser(email);
      } else {
        setUser(null);
      }
      setLoading(false); 
    };

    initAuth();
  }, []);

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