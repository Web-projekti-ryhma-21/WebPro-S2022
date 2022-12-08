import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function LoginView (props) {

    const navigate = useNavigate();
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try{
            const result = await axios.post (
                'http://localhost:3001/login',
                null,
                {
                    auth: {
                        username: event.target.username.value,
                        password: event.target.password.value                 
                    }
                }
            );
            console.log(result);
                const receivedJWT = result.data.jwt;
                props.login(receivedJWT);
                navigate('/', { replace: true});
        } catch (error){
            console.log(error);
            
        }
    }

    return (
        <div>
         <h2>Kirjautuminen</h2>   
        <form onSubmit={ handleLoginSubmit }>
            <div>
                Käyttäjänimi <br/>
                <input type="text" name="username" />
            </div>
            <div>
                Salasana <br/>
                <input type="text" name="password" />
            </div>
            <div>
                {<button type="submit">Kirjaudu</button>}
            </div>
        </form>
        </div>
    )
}
