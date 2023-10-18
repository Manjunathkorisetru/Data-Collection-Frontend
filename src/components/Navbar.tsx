import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-6">
      <div>
        <Link to="/dashboard" className="text-lg font-bold">
          Data Collection
        </Link>
      </div>
      <div className="flex justify-evenly w-[50vw] h-[50px] items-center">
        <Link
          to="/dashboard"
          className={`hover:text-red-700 ${
            location.pathname === "/dashboard"
              ? "bg-slate-100 shadow-lg rounded-lg text-black p-2 hover:text-blue-95"
              : ""
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/upload"
          className={`hover:text-red-700 ${
            location.pathname === "/upload"
              ? "bg-slate-100 shadow-lg rounded-lg text-black p-2 hover:text-blue-950"
              : ""
          }`}
        >
          Upload
        </Link>
        <Link
          to="/profile"
          className={`hover:text-red-700 ${
            location.pathname === "/profile"
              ? "bg-slate-100 shadow-lg rounded-lg text-black p-2 hover:text-blue-950"
              : ""
          }`}
        >
          Profile
        </Link>
        <Link
          to="/"
          className="hover:text-red-700"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
          }}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
