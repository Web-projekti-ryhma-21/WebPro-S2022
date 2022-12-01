import React from "react";
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom'

export default function Koti() {
    return (
        <div>
            Kotisivu <br />
            <Link to="signup">Sign up</Link><br />
            <Link to="login">Login</Link><br />
        </div>
    )
}