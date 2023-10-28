import axios, { AxiosError } from "axios";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
  setToken: (token: string) => void;
}

const Login = ({ setToken }: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [emailError, setEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const BACKEND_URL = "https://data-app-jy7j2.ondigitalocean.app/users";

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        email: email,
        password: password,
      });
      const data = response.data;
      if (response.status === 200) {
        navigate("/dashboard");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", email.split("@")[0]);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        setInvalidCredentials(true);
      }
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center
    bg-gradient-to-l from-cyan-500 to-blue-500 h-screen"
    >
      <header className="text-4xl font-bold mt-[10vh]">
        Data Collection Web App
      </header>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center h-[50vh] w-[50vw] mt-[10vh]
     drop-shadow-2xl rounded-xl p-4 gap-8 sm:w-[40vw] sm:h-[40vh] 
     bg-slate-100"
      >
        <input
          id="emailId"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className={`border ${
            invalidCredentials ? `border-red-600` : `border-gray-400`
          }  rounded-md p-2 ml-2 w-[25vw]`}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            className={`border ${
              invalidCredentials ? `border-red-600` : `border-gray-400`
            }  rounded-md p-2 ml-2 w-[25vw]`}
          />

          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            fontSize="18px"
            color="black"
            className="absolute top-3 right-2 cursor-pointer"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          />

          {invalidCredentials && (
            <p className="text-red-500 text-xs mt-2">Invalid Credentials</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white
        font-bold py-2 px-6 ml-2 rounded items-center w-[15vw]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
