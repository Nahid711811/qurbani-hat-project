import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
    <header>
      <Navbar />
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
