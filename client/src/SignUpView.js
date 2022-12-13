import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpView() {

  const [signupAnnouncerState, setSignupAnnouncerState] = useState("idle")
  const navigate = useNavigate();

   const SignUpForm = async (event) => {
    event.preventDefault();
    setSignupAnnouncerState("Käsitellään...")
    console.log(event.target.username.value);
    console.log(event.target.password.value);

    try {
        const result = await axios.post('http://localhost:3001/register',
        {
            username: event.target.username.value,
            password: event.target.password.value
        }
        );
        console.log(result);
        setSignupAnnouncerState("signupSuccess")
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 1500)
        

    } catch (error) {
        console.log(error);
        setSignupAnnouncerState("signupFailure")
    }
   }
   let signupUIControls = null;
   switch(signupAnnouncerState) {
    case "idle":
    signupUIControls = <button type="submit">Signup</button>
    break;

    case "processing":
    signupUIControls = <span>Processing...</span>
    break;

    case "signupSuccess":
        signupUIControls = <span style={{ color: "green"}}>Signup succes</span>
        break;

    case "signupFailure":
        signupUIControls = <span style={{color:"red"}}>Error</span>
        break;
   }
    
    return (
        <div>
            <h2>Luo käyttäjä</h2>
            <form onSubmit={ SignUpForm }>
                <div>
                    Käyttäjänimi <br />
                    <input type="text" name="username"></input>
                </div>
                <div>
                    Salasana <br />
                    <input type="text" name="password"></input>
                </div>
                <div>
                    { signupUIControls }
                </div>
            </form>
            </div>
    )
    }