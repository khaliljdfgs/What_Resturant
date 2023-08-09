
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('User-info')) {
            let check=JSON.parse(localStorage.getItem("User-info"));
            if (check.role=='restaurant') {
                Navigate("/restuarant");
            }
            else if (check.role=='user') {
                Navigate("/");
            }
        }
    }, [])

    async function login() {
        let item = { email, password };

        let result = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        result = await result.json();

        if (result.role=='restaurant') {
            localStorage.setItem("User-info", JSON.stringify(result));
            Navigate("/restuarant");
        }
        else if (result.role=='admin') {
            localStorage.setItem("User-info", JSON.stringify(result));
            Navigate("/dashboard");
        }
        else if (result.role=='user') {
            localStorage.setItem("User-info", JSON.stringify(result));
            Navigate("/");
        }
        else {
            alert(JSON.stringify(result))
        }
    }

    // function forget_password() {
    //     Navigate('/forget')
    // }

    return (
        <div>
            <div>
                {/* <Header/> */}
            </div>
            <div className="col-sm-6 offset-sm-3">
                <input onChange={(text) => setEmail(text.target.value)} className="form-control" type="email" placeholder="Email" />
                <br />
                <input onChange={(text) => setPassword(text.target.value)} className="form-control" type="password" placeholder="Password" />
                <br />
                <button onClick={login} className="btn btn-primary">
                    Log In
                </button>
                <br />

            </div>
        </div>
    )
}
export default Login;