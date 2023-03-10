import "../../css/utility/header.css";
import { useState } from "react";
import { useEffect } from "react";

export function Header() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(null);
  const [credentials, setCredentials] = useState('')

  useEffect(() => {
    setCredentials(localStorage.getItem('username'))
  })
  const loginModalPopup = () => {
    setLoginPopup(!loginPopup);
  };
  const body = {
    username: username,
    password: password,
  }
  const login = async (e) => {
    try {
      const push = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const res = await push.json()
      console.log(res);
      getUser();
    } catch (err) {
      console.log(err);
    }
  }


    const getUser = async (e) => {
      try {
        const push = await fetch("http://localhost:8000/getUser",
         {
          method: "GET",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
        });
        const data = await push.json()
        console.log(data);
        localStorage.setItem('username', data.message.userName)
        setCredentials(localStorage.getItem('username'))
        console.log(credentials)
     
  
      } catch (err) {
        console.log(err);
      }
    }
  const recordUsername = (e) => {
    setUsername(e.target.value)
  }
  const recordPassword = (e) => {
    setPassword(e.target.value)
  }
  return (
    <header className="headermainwrap">
      <div>Logo</div>{'Welcome back ' + credentials}
      {/* <section className="loginsvgandmodalwrap"> */}
      <div onClick={loginModalPopup} className="loginwrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>account</title>
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
      </div>
      <div className={loginPopup ? "loginpopup" : "hide"}>
        <button>X</button>
        <p>Not a member?<a href="register">Join Now!</a></p>
        <label>
          <input className="loginInputs" onChange={(e) => recordUsername(e)} name="username" placeholder="Username"></input>
        </label>
        <label>
          <input  className="loginInputs" onChange={(e) => recordPassword(e)} name="password" placeholder="Password"></input>
        </label>
        <button onClick={login}>Login</button>
        {/* <button>Register</button> */}
        </div>
    </header>
  );
}
export default Header;
