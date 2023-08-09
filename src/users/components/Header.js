import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header(props) {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordLengthValid, setPasswordLengthValid] = useState(true);
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [check, setCheck] = useState(props.cmp);
    const [login, setLogin] = useState('login');
    const [status, setStatus] = useState(false);;
    const [show, setShow] = useState(false);
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('User-info')) {
            setUser(JSON.parse(localStorage.getItem("User-info")));
            setAuth(true);
        }
    }, [auth])

    useEffect(() => {
        setPasswordLengthValid(true);
        setConfirmPassword(true);
    }, [show])

    async function signup(e) {
        e.preventDefault();
        let name = fname + lname;
        let item = { name, email, password };

        let result = await fetch("http://localhost:8000/api/webregister", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        result = await result.json();
        if (result['name']) {
            alert('SignUp Successfully');
            setLogin('login');
        }
        else {
            alert(JSON.stringify(result.message));
        }
    };

    async function Login(e) {
        e.preventDefault();
        let item = { email, password };
        if (status) {
            setLoading(true);
            let result = await fetch("http://localhost:8000/api/restaurant_login", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            result = await result.json();
            if (result['r_name']) {
                localStorage.setItem("Restaurant-info", JSON.stringify(result));
                setLoading(false);
                Navigate('/restaurant_dashboard')
            }
            else {
                setLoading(false);
                alert(JSON.stringify(result.error));
            }
        }
        else {
            setLoading(true);
            try {
                const result = await fetch("http://localhost:8000/api/restaurantlogin", {
                    method: 'POST',
                    body: JSON.stringify(item),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                const data = await result.json();
                if (data['name']) {
                    localStorage.setItem("User-info", JSON.stringify(data));
                    window.location.reload();
                    setLoading(false);
                } else {
                    setLoading(false);
                    alert(JSON.stringify(data.error));
                }
            } catch (error) {
                setLoading(false);
                alert('Error:', error);
                // Handle the error gracefully (e.g., show an error message)
            }

        }
    }
    async function forgetPassword(e) {
        e.preventDefault();
        let item = { email, status };
        let result = await fetch("http://localhost:8000/api/webforget", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        result = await result.json();
        alert(result);
            // setCheck(false);
        setLogin('login');
    }

    const Compare = () => {
        Navigate('/comparisonscreen');
    }

    const LogOut = () => {
        localStorage.clear('User-info');
        setAuth(false);
        window.location.reload();
    }
    // function form(e) {
    //     e.preventDefault();
    //     Login();
    // }
    function handleChangeFirstName(e) {
        const inputValue = e.target.value;
        const regex = /^[a-zA-Z\s]+$/;

        if (regex.test(inputValue)) {
            setFirstName(inputValue);
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity('Please enter only alphabetic characters.');
        }
    }
    function handleChangeLastName(e) {
        const inputValue = e.target.value;
        const regex = /^[a-zA-Z\s]+$/;

        if (regex.test(inputValue)) {
            setLastName(inputValue);
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity('Please enter only alphabetic characters.');
        }
    }
    function handlePassword(e) {
        setPasswordsMatch(true); // Reset the password match status on each input change
        // setPasswordLengthValid(true); 
        const inputValue = e.target.value;
        if (inputValue.length < 8) {
            e.target.setCustomValidity('Password must be at least 8 character');
        } else {
            setPassword(inputValue)
            e.target.setCustomValidity('');
        }
    }
    function handleConfirmPassword(e) {
        setPasswordsMatch(true);
        const inputValue = e.target.value;
        if (inputValue == password) {
            setConfirmPassword(inputValue)
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity('Password is not matching');
        }
    }
    return (
        <div>
            <Modal show={show} onHide={() => setShow(false) + setLogin('login')}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {
                        login === 'login' &&
                        <form id="form" onSubmit={Login}>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input onChange={(email) => setEmail(email.target.value)} type="email" id="form2Example1" className="form-control" />
                                <label className="form-label" htmlFor="form2Example1">Email address</label>
                            </div>
                            {/* Password input */}
                            <div className="form-outline mb-4">
                                <input onChange={(password) => setPassword(password.target.value)} type="password" id="form2Example2" className="form-control" />
                                <label className="form-label" htmlFor="form2Example2">Password</label>
                            </div>
                            {/* 2 column grid layout for inline styling */}
                            <div className="row mb-4">
                                <div className="col d-flex">
                                    {/* Checkbox */}
                                    <div className="form-check">
                                        <input onChange={(check) => setStatus(check.target.checked)} className="form-check-input" type="checkbox" defaultValue id="form2Example31" />
                                        <label className="form-check-label" htmlFor="form2Example31">Sign in as Restaurant</label>
                                    </div>
                                </div>
                                <div className="col">
                                    {/* Simple link */}
                                    <a className='pointer' onClick={() => setLogin('forget')}>Forgot password?</a>
                                </div>
                            </div>
                            {/* Submit button */}
                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                {
                                    loading ? (
                                        <Spinner animation="border" variant="primary" />
                                    ):
                                    (
                                        <span>Login</span>
                                    )
                                }
                            </button>
                            {/* Register buttons */}
                            <div className="text-center">
                                <p>Not a member? <a onClick={() => setLogin('register')} className="pointer text-primary">Register</a></p>
                                {/* <p>or sign up with:</p>
                                <button type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-facebook-f" />
                                </button>
                                <button type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-google" />
                                </button>
                                <button type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-twitter" />
                                </button>
                                <button type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-github" />
                                </button> */}
                            </div>
                        </form>
                    }
                    {
                        login === 'register' &&
                        (
                            <form id="form" onSubmit={signup}>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input onChange={handleChangeFirstName} type="text" id="form3Example1" className="form-control" />
                                            <label className="form-label" htmlFor="form3Example1">First name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input onChange={handleChangeLastName} type="text" id="form3Example2" className="form-control" />
                                            <label className="form-label" htmlFor="form3Example2">Last name</label>
                                        </div>
                                    </div>
                                </div>
                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <input onChange={(email) => setEmail(email.target.value)} type="email" id="form3Example3" className="form-control" />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>
                                {/* Password input */}
                                <div className="form-outline mb-4">
                                    <input onChange={handlePassword} type="password" id="form3Example4" className={`form-control ${!passwordLengthValid ? 'is-invalid' : ''}`} />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input onChange={handleConfirmPassword} type="password" id="form3Example4" className={`form-control ${!passwordsMatch ? 'is-invalid' : ''}`} />
                                    <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
                                    {/* {passwordError && <p className="text-danger">{passwordError}</p>} */}
                                </div>
                                {/* Checkbox */}
                                <div className="d-flex mb-4">
                                    <p>Resgister your restaurant?</p>
                                    <a onClick={() => Navigate('/requestform')} className="nav-link ml-2 text-primary">Register</a>
                                </div>
                                {/* Submit button */}
                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Sign up
                                </button>
                                {/* Register buttons */}
                                {/* <div className="text-center">
                                    <p>or sign up with:</p>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-facebook-f" />
                                    </button>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-google" />
                                    </button>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-twitter" />
                                    </button>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-github" />
                                    </button>
                                </div> */}
                            </form>
                        )
                    }
                    {
                        login === 'forget' &&
                        (
                            <form id="form" onSubmit={forgetPassword}>
                                <div className="form-outline mb-4">
                                    <input onChange={(email) => setEmail(email.target.value)} type="email" id="form2Example1" className="form-control" />
                                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                                </div>
                                <div className="d-flex">
                                    {/* Checkbox */}
                                    <div className="form-check">
                                        <input onChange={(check) => setStatus(check.target.checked)} className="form-check-input" type="checkbox" defaultValue id="form2Example31" />
                                        <label className="form-check-label" htmlFor="form2Example31">Reset Restaurant's Password</label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
                            </form>
                        )
                    }
                </Modal.Body>
            </Modal>
            <div className='container-xxl p-0' style={{ backgroundColor: '#0F172B' }}>
                <div className="container-xxl position-relative p-0">
                    <nav className="navbar navbar-expand-lg navbar-dark px-4 px-lg-5 py-3 py-lg-0">
                        <a href className="navbar-brand p-0">
                            <h1 className="m-0 logo"><i className="fa fa-utensils me-3" />WhatRestaurant</h1>
                            {/* <img src="img/logo.png" alt="Logo"> */}
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto py-0 pe-4">
                                {
                                    check === 'restaurant' &&
                                    (
                                        <>
                                            <a onClick={() => Navigate('/')} className="nav-item nav-link pointer">Home</a>
                                            <a className="nav-item nav-link pointer active">Profile</a>
                                            <a className="nav-item nav-link pointer">About</a>
                                            {/* <a className="nav-item nav-link">Menu</a> */}
                                            <a className="nav-item nav-link pointer">Contact</a>
                                            {
                                                auth == true && (
                                                    <div className="nav-item dropdown">
                                                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user.name}</a>
                                                        <div className="dropdown-menu m-0">
                                                            <a className="dropdown-item">Booking</a>
                                                            <a className="dropdown-item">Our Team</a>
                                                            <a onClick={LogOut} className="dropdown-item">Log Out</a>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                                {
                                    check === 'home' &&
                                    (
                                        <>
                                            <a className="nav-item nav-link active">Home</a>
                                            <a className="nav-item nav-link" onClick={Compare}>Compare</a>
                                            {
                                                auth == true && (
                                                    <div className="nav-item dropdown">
                                                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user.name}</a>
                                                        <div className="dropdown-menu m-0">
                                                            <a href="booking.html" className="dropdown-item">Booking</a>
                                                            <a onClick={LogOut} className="dropdown-item">LogOut</a>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                                {
                                    check === 'compare' &&
                                    (
                                        <>
                                            <a onClick={() => Navigate('/')} className="nav-item nav-link">Home</a>
                                            <a className="nav-item nav-link active" onClick={Compare}>Compare</a>
                                            {
                                                auth == true && (
                                                    <div className="nav-item dropdown">
                                                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user.name}</a>
                                                        <div className="dropdown-menu m-0">
                                                            <a href="booking.html" className="dropdown-item">Booking</a>
                                                            <a onClick={LogOut} className="dropdown-item">LogOut</a>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </div>
                            {
                                auth == false &&
                                (
                                    <a onClick={() => setShow(true)}  style={{backgroundColor:'#FFC107'}} className="btn py-2 px-4">Log in</a>
                                )
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}
