import { Link } from "react-router-dom";

export default function Navbar({ user, handleLogout }) {
    console.log("User", user)
  return (
    <nav className="flex justify-between p-4 shadow bg-white">

      <h1 className="text-xl font-bold">Qurbani Hat</h1>

      <div className="flex gap-4 items-center">

        <Link to="/">Home</Link>
        <Link to="/animals">Animals</Link>

        {!user ? (
          <>
            <Link to="/login_user">Login</Link>
            <Link to="/register_user">Register</Link>
          </>
        ) : (
          <>
            <img
              src={user?.photo}
              className="w-10 h-10 rounded-full"
            />

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}