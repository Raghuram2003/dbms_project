import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginOrRegister, setLoginOrRegister] = useState("register");
  const [id, setId] = useState(null);
  const [allUserData, setAllUserData] = useState(null);

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/api/" + loginOrRegister, {
        username,
        password,
      });
      console.log(response, response.status, response.data.message);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      setId(response.data.user_data.id);
      setAllUserData(response.data.all_user_data);
      setPassword("");
      console.log(allUserData);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 409)
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  async function logout() {
    const res = await axios.post("/api/logout", { id });
    if (res.status === 200) {
      toast.success(res.data.message);
    }
    setId(null);
    console.log(res);
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 min-h-screen flex items-center h-full ">
      {!id ? (
        <form
          className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {loginOrRegister === "register" ? "Create an Account" : "Login"}
          </h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-lg p-2 mb-4 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg p-2 mb-4 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="bg-blue-500 text-white w-full rounded-lg py-2 font-bold hover:bg-blue-600 transition duration-300">
            {loginOrRegister === "register" ? "Register" : "Login"}
          </button>
          <span className="text-center mt-4 text-gray-600 cursor-pointer">
            {loginOrRegister === "register"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              onClick={() =>
                setLoginOrRegister(
                  loginOrRegister === "register" ? "login" : "register"
                )
              }
              className="text-blue-500 focus:outline-none"
            >
              {loginOrRegister === "register" ? "Login here" : "Register here"}
            </span>
          </span>
        </form>
      ) : (
        <div className="text-white mx-auto min-h-screen h-full flex flex-col">
          <h1 className="text-3xl font-bold mb-6 text-center">User Data</h1>
          {/* <div className="text-white flex-auto align-middle flex items-center justify-center">
            <span className="border border-white px-6 py-4 text-ce">
              <p>You &apos;re logged in as {username}</p>
              <p>Your emp id is {id}</p>
            </span>
          </div> */}
          {/* {allUserData.map((data,idx)=>(
            <div className="flex gap-4" key={idx}>
              <span>{data.id}</span>
              <span>{data.emp_name}</span>
              <span>{data.emp_password}</span>
              <span>{data.is_signed_in}</span>
            </div>
          ))} */}
          <div className="flex-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Password</th>
                <th className="border border-gray-300 px-4 py-2">
                  Signed In
                </th>
              </tr>
            </thead>
            <tbody>
              {allUserData.map((data, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.emp_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.emp_password}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.is_signed_in ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 self-center hover:bg-red-600 transition duration-300 focus:outline-none mb-2"
          >
            Log Out
          </button>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
