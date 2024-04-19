import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
function App() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [loginOrRegister, setLoginOrRegister] = useState("register");
  const [id, setId] = useState(null);

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
      setpassword("");
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
    if (res.status == 200) {
      toast.success(res.data.message);
    }
    setId(null);
    console.log(res);
  }

  return (
    <div className="bg-black h-screen flex items-center">
      {!id && (
        <>
          <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
            <h1 className="text-white text-center mb-2 text-2xl">Login Form</h1>
            <input
              type="text"
              placeholder="username"
              className="block w-full rounded-sm p-2 mb-2 border text-center "
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="block w-full rounded-sm p-2 mb-2 border text-center"
              value={password}
              onChange={(ev) => setpassword(ev.target.value)}
            />
            <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
              {loginOrRegister === "register" ? "Register" : "Login"}
            </button>
            {loginOrRegister === "register" && (
              <div className="text-center mr-2 text-white">
                Already a user?{" "}
                <button
                  onClick={() => setLoginOrRegister("login")}
                  className="text-white"
                >
                  Login here
                </button>
              </div>
            )}
            {loginOrRegister === "login" && (
              <div className="text-center mr-2 text-white">
                Not a existing user?
                <button
                  onClick={() => setLoginOrRegister("register")}
                  className="text-white"
                >
                  Register here
                </button>
              </div>
            )}
          </form>
        </>
      )}
      {!!id && (
        <div className="text-white mx-auto h-screen flex flex-col w-2/4">
          <h1 className="text-center">Home page</h1>
          <div className="text-white flex-auto align-middle flex items-center justify-center">
            You&apos;re logged in as {username} , your emp id is {id}
          </div>
          <button onClick={logout}>Log Out</button>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
