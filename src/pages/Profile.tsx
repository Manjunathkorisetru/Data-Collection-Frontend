import { useState } from "react";

interface ProfileProps {
  firstName: string;
  lastName: string;
  emailId: string;
  role: number;
}

function Profile({
  firstName: initialFirstName,
  lastName: initialLastName,
  emailId: initialEmailId,
  role: initialRole,
}: ProfileProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [emailId, setEmailId] = useState(initialEmailId);
  const [role, setRole] = useState(initialRole);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement the logic to update the user profile
  };

  return (
    <div
      className={`flex flex-col justify-center gap-4
      h-screen border-10 border-b-black  items-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className="rounded-lg shadow-lg bg-blue-300 w-1/3 min-h-min mt-40
      flex flex-col items-center gap-4"
      >
        <h1 className="text-4xl font-bold mt-4">{`${firstName} ${lastName}`}</h1>
        <p className="text-lg">{`Email: ${emailId}`}</p>
        <p className="text-lg">{`Role: ${role}`}</p>
        <button
          className={`mt-4 px-4 py-2 rounded-md mb-4 ${
            isDarkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"
          }`}
          onClick={toggleMode}
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
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
          <input
            id="role"
            type="number"
            value={role}
            onChange={(event) => setRole(parseInt(event.target.value))}
            className="w-[20vw] h-[5vh] p-4 rounded-lg border-gray-300 
            shadow-sm"
          />
        </div>
        <button
          type="submit"
          className={`mt-4 px-4 py-2 rounded-md mb-10 ${
            isDarkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"
          }`}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
