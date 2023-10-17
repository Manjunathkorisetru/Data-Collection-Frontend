import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import UploadPage from "./pages/Upload";
// import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

// const dataSets = [
//   {
//     id: 1,
//     image:
//       "https://images.unsplash.com/photo-1697014960830-44289859e55b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
//     features: [
//       {
//         name: "F1",
//         value: "Text",
//         type: "Text",
//       },
//       {
//         name: "F2",
//         value: "Date",
//         type: "Date",
//       },
//     ],
//   },
//   {
//     id: 2,
//     image:
//       "https://images.unsplash.com/photo-1696963937855-ede32b298348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3151&q=80",
//     features: [
//       {
//         name: "F1",
//         value: "Text",
//         type: "Text",
//       },
//       {
//         name: "F2",
//         value: "Date",
//         type: "Date",
//       },
//       {
//         name: "F3",
//         value: "Date",
//         type: "Date",
//       },
//       {
//         name: "F4",
//         value: "Date",
//         type: "Date",
//       },
//     ],
//   },
// ];

// const dataSets1 = [
//   {
//     id: 1,
//     image:
//       "https://images.unsplash.com/photo-1697014960830-44289859e55b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
//     features: [
//       {
//         name: "F1",
//         value: "Text",
//         type: "Text",
//       },
//       {
//         name: "F2",
//         value: "Date",
//         type: "Date",
//       },
//     ],
//   },
// ];

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [role, setRole] = useState(0); // 0 - admin, 1 - user
  const [dataSets, setDataSets] = useState([]);

  const getDataSets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const data = response.data;
      setDataSets(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataSets();
  }, []);

  return (
    <div>
      {location.pathname !== "/" && (
        <Navbar setIsAuthenticated={setIsAuthenticated} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              setIsAuthenticated={setIsAuthenticated}
              setRole={setRole}
            />
          }
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/upload"
          element={
            isAuthenticated ? (
              <UploadPage dataSets={dataSets} getDataSets={getDataSets} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              role === 0 ? (
                <DashboardPage dataSets={dataSets} />
              ) : (
                <DashboardPage dataSets={dataSets1} />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}

        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <ProfilePage
                firstName="Manjunath"
                lastName="Korisetru"
                role={0}
                emailId="manjukori@outlook.com"
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
