import "../../css/utility/header.css";
import { useState } from "react";


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
const recordUsername = (e) => {
    body.username = e.target.value
}
const recordPassword = (e) => {
    body.password = e.target.value
    console.log(body)
}
const recordConfirmPassword = (e) => {
    body.confirmPassword = e.target.value
    console.log(body)
}
const recordEmail = (e) => {
    body.email = e.target.value
    console.log(body)
}
  return (
 <form>
    <label>Username
        <input onChange={(e) => recordUsername(e)}>
        </input>
    </label>
    <label>email
        <input onChange={(e) => recordEmail(e)}>
        </input>
    </label>
    <label>Password
        <input onChange={(e) => recordPassword(e)}>
        </input>
    </label>
    <label>Confirm Password
        <input onChange={(e) => recordConfirmPassword(e)}>
        </input>
    </label>
    <button onClick={registerUser}>Register</button>
 </form>
  )
}
export default SignUpPage;
