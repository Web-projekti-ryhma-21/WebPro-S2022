import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpView() {

  const [signupAnnouncerState, setSignupAnnouncerState] = useState("...")
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
        navigate('/login', { replace: true });

    } catch (error) {
        console.log(error);
    }
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
                    <button type="submit">Luo käyttäjä</button>
                </div>
            </form>
            </div>
    )
    }