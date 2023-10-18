import { useEffect, useState } from "react";

function Profile({ dataSets: initialDataSets }: { dataSets: any }) {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement the logic to update the user profile
  };

  const currentUser = `${localStorage.getItem("userInfo")}@gmail.com`;

  const user = initialDataSets
    .map((item: any) => {
      return item.email === currentUser ? item : null;
    })
    .filter((item: any) => item !== null);

  useEffect(() => {
    setEmailId(user[0].email);
    setFirstName(user[0].firstName);
    setLastName(user[0].lastName);
  }, [user]);

  return (
    <div
      className={`flex flex-col justify-center gap-4
      h-screen border-10 border-b-black  items-center bg-white text-gray-900`}
    >
      {user.length > 0 ? (
        <div
          className="rounded-lg shadow-lg bg-blue-300 w-1/3 min-h-min mt-40
      flex flex-col items-center gap-4"
        >
          <h1 className="text-4xl font-bold mt-4">
            {user[0].firstName} {user[0].lastName}
          </h1>
          <p className="text-lg">{`Email:${user[0].email}`}</p>
          <p className="text-lg">{`Role:${user[0].role} `}</p>
          {/* <button
          className={`mt-4 px-4 py-2 rounded-md mb-4 bg-white text-gray-900
          }`}
          //onClick={toggleMode}
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button> */}
        </div>
      ) : null}

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
        <div className="flex flex-col justify-center gap-2 items-center mt-10">
          <label htmlFor="emailId" className="block font-medium text-black-700">
            Email
          </label>
          <input
            id="emailId"
            type="email"
            value={emailId}
            onChange={(event) => setEmailId(event.target.value)}
            className="w-[20vw] h-[5vh] p-4 rounded-lg border-gray-300 
            shadow-sm"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 items-center mt-10">
          <label htmlFor="role" className="block font-medium text-black-700">
            Role
          </label>
          {/* <input
            id="role"
            type="number"
            value={role}
            onChange={(event) => setRole(parseInt(event.target.value))}
            className="w-[20vw] h-[5vh] p-4 rounded-lg border-gray-300 
            shadow-sm"
          /> */}
        </div>
        <button
          type="submit"
          className={`mt-4 px-4 py-2 rounded-md mb-10 bg-white text-gray-900`}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
