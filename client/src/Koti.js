import React from "react";
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom'
import Visualization01 from './Visual01';

export default function Koti(props) {

    console.log(props);
    return (
        <div className="koti">
            Kotisivu
            <div>
                User login status: { props.userLoggedIn ? "user is logged in" : "user is not logged in" }
                </div>
                <div>
                    { props.userLoggedIn ?
                    <Link to="visuals">Go to visuals</Link>
                    :
                    <>
                    <Link to="signup">Sign up</Link><br />
                    <Link to="login">Login</Link>
                    </>
                    }
           
        </div>
        </div>
    )
}