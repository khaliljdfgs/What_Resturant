import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';
import Reservation from './components/Reservation';

export default function RestaurantProfile () {
    const Location = useLocation();
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(null);
    const [login, setLogin] = useState('login');
    const [status, setStatus] = useState(true);;
    const [show, setShow] = useState(false);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('User-info')) {
            setAuth(true);
        }
    }, [])

    return (
            <div className='container-xxl bg-white p-0'>
                {/* Header */}
                <Header cmp={'restaurant'}/>
                {/* Restaurant Hero */}
                <div class="container-xxl py-5 bg-dark hero-header mb-5">
                    <div class="container text-center my-5 pt-5 pb-4">
                        <h1 class="display-3 text-white mb-3 animated slideInDown">{Location.state.restaurant_name}</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center text-uppercase">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item"><a href="#">Pages</a></li>
                                <li class="breadcrumb-item text-white active" aria-current="page">{Location.state.restaurant_name}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                {/* Menu */}
                <Menu cmp={Location.state.restaurant_id} />

                <Reservation cmp={Location.state.restaurant_id}/>
                <Footer />
            </div>
    )
}
