import { useContext } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user, logout } = useContext(AuthContext);
  console.log("user", user)

  return (
    <>
      <Navbar user={user} handleLogout={logout} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
} 