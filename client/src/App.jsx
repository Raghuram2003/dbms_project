import axios from "axios";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [loginOrRegister, setLoginOrRegister] = useState("register");
  const [id, setId] = useState(null);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const { data } = await axios.post("/api/" + loginOrRegister, {
      username,
      password,
    });
    setId(data.user_data.id);
    setUsername("")
    setpassword("")
    console.log(data);
  }

  async function logout(){
    const res = await axios.post("/api/logout",{id});
    setId(null)
    console.log(res)
  }

  return (
    <div className="bg-slate-300 h-screen flex items-center">
      {!id && (
        <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
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
            <div className="text-center mr-2">
              Already a user?{" "}
              <button onClick={() => setLoginOrRegister("login")}>
                Login here
              </button>
            </div>
          )}
          {loginOrRegister === "login" && (
            <div className="text-center mr-2">
              Not a existing user?
              <button onClick={() => setLoginOrRegister("register")}>
                Register here
              </button>
            </div>
          )}
        </form>
      )}
      {!!id && (
        <>
          <div className="justify-center">
            youre logged in as {username} , your id is {id}
          </div>
          <button onClick={logout}>Log Out</button>
        </>
      )}
    </div>
  );
}

export default App;
