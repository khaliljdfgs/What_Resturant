import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    useEffect(() => {
       if (localStorage.getItem('User-info')) {
            let check=JSON.parse(localStorage.getItem("User-info"));
            if (check.role==='restaurant') {
                Navigate("/restuarant");
            }
            else if (check.role=='user') {
                Navigate("/");
            }
        }
    }, [])


    async function signup() {
        let role='user';
        let item = { name, email, password ,role};

        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        result = await result.json();

        localStorage.setItem("User-info", JSON.stringify(result));

        Navigate("/");
    };


    return (
        <>
            <div>
                {/* <Header /> */}
            </div>
            <div className="col-sm-6 offset-sm-3">
                <input onChange={(e) => setName(e.target.value)} className="form-control" type="text" placeholder="name" />
                <br />
                <input onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" placeholder="email" />
                <br />
                <input onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" placeholder="password" />
                <br />
                <button onClick={signup} className="btn btn-primary">SignUp</button>
            </div>
        </>
    )
}
export default Register