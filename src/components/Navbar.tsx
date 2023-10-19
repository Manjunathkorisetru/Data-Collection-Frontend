import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const location = useLocation();

  return (
    <div className="sticky top-0 z-50">
      <nav className="flex justify-between items-center bg-gray-800 text-white p-6">
        <div>
          <Link to="/dashboard" className="text-lg font-bold">
            Data Collection
          </Link>
        </div>
        <div className="flex justify-evenly w-[50vw] h-[50px] items-center">
          <Link
            to="/dashboard"
            className={`hover:text-red-600 ${
              location.pathname === "/dashboard"
                ? "bg-slate-100 shadow-lg rounded-lg text-black p-2 hover:text-blue-95"
                : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/upload"
            className={`hover:text-red-600 hover:scale-105 ${
              location.pathname === "/upload"
                ? "bg-slate-100 shadow-lg rounded-lg text-black p-2 hover:text-blue-950"
                : ""
            }`}
          >
            Upload
          </Link>
          <Link
            to="/profile"
            className={`hover:text-red-600 hover:scale-105${
              location.pathname === "/profile"
                ? "bg-slate-100 shadow-lg rounded-lg text-black p-2 hover:text-blue-950"
                : ""
            }`}
          >
            Profile
          </Link>
          <Link
            to="/"
            //className="hover:text-red-600 hover:scale-125"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userInfo");
            }}
          >
            <FontAwesomeIcon
              icon={faRightToBracket}
              fontSize="18px"
              color="white"
              className="hover:text-red-600 hover:scale-125"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
