import { Link } from "react-router-dom";

export default function Navbar({ user, handleLogout }) {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Left - Title */}
      <div className="text-2xl font-bold text-blue-600">
        MyApp
      </div>

      {/* Right - Menu */}
      <div className="flex items-center gap-4">
        
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>

        <Link to="/animals" className="hover:text-blue-500">
          All Animals
        </Link>

        {/* Conditional Rendering */}
        {!user ? (
          <>
            <Link to="/login_user">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Login
              </button>
            </Link>

            <Link to="/register_user">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                Register
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            
            {/* Avatar */}
            <img
              src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="user"
              className="w-10 h-10 rounded-full border"
            />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}