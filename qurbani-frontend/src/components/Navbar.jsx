import { Link } from "react-router-dom";

export default function Navbar({ user, handleLogout }) {
  // console.log("User", user)
  return (
    <nav className="rounded-b-md flex justify-between p-1 md:p-4 shadow bg-[#468432] text-white">
      <Link to={"/"}>
        <div className="text-xl md:text-2xl font-bold tracking-wide">
          <span className="text-[#FFA02E]">Qurbani</span>Hat
        </div>
      </Link>

      <div className="flex gap-2 md:gap-4 items-center">
        <Link className="hover:text-[#FFA02E]" to="/">
          Home
        </Link>
        <Link className="hover:text-[#FFA02E]" to="/all_animals">
          Animals
        </Link>

        {!user ? (
          <>
            <Link className="hover:text-[#FFA02E]" to="/login_user">
              Login
            </Link>
            <Link className="hover:text-[#FFA02E]" to="/register_user">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="my_profile">
              <img src={user?.photo} className="w-10 h-10 rounded-full" />
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-md bg-red-500 text-white px-3 py-1"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
