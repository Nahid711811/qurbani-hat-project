import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#468432] rounded-t-md text-white">
      
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Brand */}
       <div className="text-2xl font-bold tracking-wide text-white">
          <span className="text-[#FFA02E]">Qurbani</span>Hat
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link
            to="/"
            className="hover:text-blue-400 transition duration-200"
          >
            Home
          </Link>

          <Link
            to="/animals"
            className="hover:text-blue-400 transition duration-200"
          >
            All Animals
          </Link>

          <Link
            to="/login_user"
            className="hover:text-blue-400 transition duration-200"
          >
            Login
          </Link>
        </div>

        {/* Right text */}
        <div className="text-xs text-gray-300 text-center md:text-right">
          © {new Date().getFullYear()} MyApp. <br className="md:hidden" />
          Built with ❤️ for learning
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-3 text-xs text-gray-300">
        Secure • Fast • Modern Experience
      </div>

    </footer>
  );
}