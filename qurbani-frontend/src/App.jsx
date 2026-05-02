import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

function App() {
 const user = null; 
   const handleLogout = () => {
    console.log("Logout clicked");
  };
  return (
    <>
    <header>
     <Navbar user={user} handleLogout={handleLogout} />
    </header>

    <main>
      <Outlet />
    </main>

    <footer>
      <Footer />
    </footer>

    </>
  )
}

export default App
