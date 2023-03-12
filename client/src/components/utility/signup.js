import "../../css/utility/signuppage.css";
import registerpagepic from '../../images/register/registerpagepic.avif'
import { useState } from "react";
import { Header } from './header.js'



export function SignUpPage() {
    const body = {};
    const registerUser = async () => {
        try {
            const pull = await fetch("http://localhost:8000/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
    }
    catch(err){ 
        console.log(err)
    }
}
const recordFirstName = (e) => {
    body.firstName = e.target.value;
    console.log(body)
}
const recordLastName = (e) => {
    body.lastName = e.target.value;
    console.log(body)
}
const recordUsername = (e) => {
    body.username = e.target.value;
    console.log(body)
}
const recordPassword = (e) => {
    body.password = e.target.value;
    console.log(body)
}
const recordConfirmPassword = (e) => {
    body.confirmPassword = e.target.value;
    console.log(body)
}
  return (
    <body>
    <Header />
    <div className="mainregisterpagewrap">
    <section className="registerimgwrap">
        <img className="registerpageimg" src={registerpagepic}></img>
    </section>
 <form className="registerform">
     <label className="registerlabels">First Name
        <input className="registerinputs" onChange={(e) => recordFirstName(e)}>
        </input>
    </label>
    <label className="registerlabels">Last Name
        <input className="registerinputs" onChange={(e) => recordLastName(e)}>
        </input>
    </label>
    <label className="registerlabels">Email
        <input className="registerinputs" onChange={(e) => recordUsername(e)}>
        </input>
    </label>
    <label className="registerlabels">Password
        <input className="registerinputs" onChange={(e) => recordPassword(e)}>
        </input>
    </label>
    <label className="registerlabels">Confirm Password
        <input className="registerinputs" onChange={(e) => recordConfirmPassword(e)}>
        </input>
    </label>
    <button className="registerbtn" onClick={registerUser}>Register</button>
 </form>
 </div>
 </body>
  )
}
export default SignUpPage;
