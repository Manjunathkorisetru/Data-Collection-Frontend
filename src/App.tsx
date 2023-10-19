import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
//import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import UploadPage from "./pages/Upload";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const location = useLocation();
  const [role, setRole] = useState(0); // 0 - admin, 1 - user
  const [dataSets, setDataSets] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  //const [emailParam, setEmailParam] = useState("");

  const getDataSets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${localStorage.getItem("token")}`,
        },
        params: {
          email: localStorage.getItem("userInfo"),
        },
      });
      const data = response.data;
      setDataSets(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getDataSets();
    }
  }, [token]);

  return (
    <div>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage setToken={setToken} />} />
        {/* <Route
          path="/signup"
          element={isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
        /> */}
        <Route
          path="/upload"
          element={
            token ? (
              <UploadPage dataSets={dataSets} getDataSets={getDataSets} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? (
              role === 0 ? (
                <DashboardPage dataSets={dataSets} />
              ) : (
                <DashboardPage dataSets={dataSets} />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
