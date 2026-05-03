import { Link, NavLink } from "react-router-dom";

export default function Navbar({ user, handleLogout }) {
  return (
    <nav className="rounded-b-md flex justify-between py-3 md:py-4 p-1 md:p-4 shadow bg-[#468432] text-white">
      <Link to={"/"}>
        <div className="text-xl md:text-2xl font-bold tracking-wide">
          <span className="text-[#FFA02E]">Qurbani</span>Hat
        </div>
      </Link>

      <div className="flex gap-2 md:gap-4 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#FFA02E]" : "hover:text-[#FFA02E]"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/all_animals"
          className={({ isActive }) =>
            isActive ? "text-[#FFA02E]" : "hover:text-[#FFA02E]"
          }
        >
          Animals
        </NavLink>

        {!user ? (
          <>
            <NavLink
              to="/login_user"
              className={({ isActive }) =>
                isActive ? "text-[#FFA02E]" : "hover:text-[#FFA02E]"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register_user"
              className={({ isActive }) =>
                isActive ? "text-[#FFA02E]" : "hover:text-[#FFA02E]"
              }
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="my_profile">
              {({ isActive }) => (
                <img
                  src={user?.photo}
                  className={`w-10 h-10 rounded-full ${
                    isActive ? "ring-2 ring-[#FFA02E]" : ""
                  }`}
                />
              )}
            </NavLink>

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