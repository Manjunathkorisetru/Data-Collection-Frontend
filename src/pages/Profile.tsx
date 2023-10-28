import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import LoadingStatus from "../components/LoadingStatus";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dataSets, setDataSets] = useState([]);
  const [showProfileUpdateBanner, setShowProfileUpdateBanner] = useState(false);
  const BACKEND_URL = "https://data-app-jy7j2.ondigitalocean.app/users";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${BACKEND_URL}/profile`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        setShowProfileUpdateBanner(true);
        window.scrollTo(0, 0);
        setTimeout(() => {
          setShowProfileUpdateBanner(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const currentUser = `${localStorage.getItem("userInfo")}@gmail.com`;

  const user = dataSets
    .map((item: any) => {
      return item.email === currentUser ? item : null;
    })
    .filter((item: any) => item !== null);

  const getDataSets = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}`, {
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
    if (localStorage.getItem("token")) {
      getDataSets();
    }
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (dataSets.length > 0) {
      setEmail(user[0].email);
      setFirstName(user[0].firstName);
      setLastName(user[0].lastName);
    }
  }, [dataSets]);

  return (
    <div
      className={`flex flex-col justify-center gap-4
      h-screen border-10 border-b-black  items-center bg-white text-gray-900`}
    >
      {showProfileUpdateBanner ? <Banner msg="Profile Updated" /> : null}
      {user.length > 0 ? (
        <>
          <div
            className="rounded-lg shadow-lg bg-blue-300 w-1/3 min-h-min mt-40
      flex flex-col items-center gap-4 p-6"
          >
            <h1 className="text-4xl font-bold mt-4">
              {user[0].firstName} {user[0].lastName}
            </h1>
            <p className="text-lg">{`Email: ${user[0].email}`}</p>
            <p className="text-lg">{`Role: ${user[0].role} `}</p>
            <p className="text-xs">{`( 0 admin - 1 user )`}</p>
            {/* <button
          className={`mt-4 px-4 py-2 rounded-md mb-4 bg-white text-gray-900
          }`}
          //onClick={toggleMode}
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button> */}
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-2/3 min-h-min rounded-xl bg-blue-300 shadow-lg mb-10 "
          >
            <div className="flex flex-col justify-center gap-2 items-center mt-10">
              <label
                htmlFor="firstName"
                className="block font-medium text-black-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="w-[20vw] h-[5vh] p-4 rounded-lg border-gray-300 
            shadow-sm"
              />
            </div>
            <div className="flex flex-col justify-center gap-2 items-center mt-10">
              <label
                htmlFor="lastName"
                className="block font-medium text-black-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="w-[20vw] h-[5vh] p-4 rounded-lg border-gray-300 
            shadow-sm"
              />
            </div>

            <button
              type="submit"
              className={`mt-8 px-4 py-2  rounded-md mb-10 bg-blue-900 text-white 
          hover:bg-blue-700`}
            >
              Save Changes
            </button>
          </form>
        </>
      ) : (
        <LoadingStatus />
      )}
    </div>
  );
}

export default Profile;
