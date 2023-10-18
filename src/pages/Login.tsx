import axios from "axios";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";

interface LoginProps {
  setToken: (token: string) => void;
}

const Login = ({ setToken }: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  // const usersList = [
  //   {
  //     email: "manju",
  //     password: "bochum",
  //     role: 0,
  //   },
  //   {
  //     email: "test",
  //     password: "test",
  //     role: 1,
  //   },
  // ];

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else {
      try {
        const response = await axios.post("http://localhost:3000/users/login", {
          email: email,
          password: password,
        });
        const data = response.data;
        if (response.status === 200) {
          navigate("/dashboard");
          setToken(data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userInfo", email.split("@")[0]);
        } else {
          alert("Invalid credentials");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  //localStorage.setItem("userInfo", JSON.stringify(email.split("@")[0]));

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-l from-cyan-500 to-blue-500 h-screen">
      <header className="text-4xl font-bold mt-[10vh]">
        Data Collection Web App
      </header>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center h-[50vh] w-[50vw] mt-[10vh]
     drop-shadow-2xl rounded-xl p-4 gap-8
     bg-slate-100"
      >
        <h6 className="text-3xl font-bold">Login</h6>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(event) => {
            setEmailError(false);
            setEmail(event.target.value);
          }}
          className={`border ${
            emailError ? "border-red-500" : "border-gray-400"
          }
            rounded-md p-2 ml-2 w-[15vw]`}
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          className="border border-gray-400 rounded-md p-2 ml-2 w-[15vw]"
        />

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
