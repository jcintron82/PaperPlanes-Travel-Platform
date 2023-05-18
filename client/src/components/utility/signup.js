import "../../css/utility/signuppage.css";
import registerpagepic from '../../images/register/registerpagepic.avif'
import { Header } from './header.js'
import { useNavigate } from "react-router-dom";



export function SignUpPage() {
    const navigate = useNavigate();
    const body = {};
    const registerUser = async () => {
        try {
            const pull = await fetch("https://paperplanes-server.vercel.app/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            navigate('/');
            console.log('navigate')
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
    <Header 
    headerClass={"headermainwrap"}
    link={"logolink"}
    planeSVG={"paperplanesvg"}
    profileSVG={"accountsvgcolored"} />
    <div className="mainregisterpagewrap">
    <section className="registerimgwrap">
        <img className="registerpageimg" src={registerpagepic}></img>
    </section>
 <form className="registerform">
     <label className="registerlabels">First Name
        <input required placeholder="John" className="registerinputs" onChange={(e) => recordFirstName(e)}>
        </input>
    </label>
    <label className="registerlabels">Last Name
        <input required placeholder="Smith" className="registerinputs" onChange={(e) => recordLastName(e)}>
        </input>
    </label>
    <label className="registerlabels">Email
        <input required placeholder="email@gmail.com" className="registerinputs" onChange={(e) => recordUsername(e)}>
        </input>
    </label>
    <label className="registerlabels">Password
        <input required  type='password' className="registerinputs" onChange={(e) => recordPassword(e)}>
        </input>
    </label>
    <label className="registerlabels">Confirm Password
        <input required type='password' className="registerinputs" onChange={(e) => recordConfirmPassword(e)}>
        </input>
    </label>
    <button className="registerbtn" onClick={registerUser}>Register</button>
 </form>
 </div>
 </body>
  )
}
export default SignUpPage;
