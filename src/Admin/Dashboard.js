import React, { useState } from 'react'
import Body from './components/Body'
import Footer from './components/Footer'
import Header from './components/Header'
import Menu from './components/Menu'
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Requests from './components/Requests'
import DishRequests from './components/DishRequests'
import ChartDemo from './components/ChartDemo'
import EmailComposer from './components/EmailComposer'
import Restaurants from './components/Restaurants'
import Users from './components/Users'

export default function Dashboard() {
    const [check, setCheck] = useState(null);
    return (
        <div>
            {/* Menu */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/logo.png" alt="WhatRestaurant Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">WhatRestaurant</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Ihtasham</a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <a  onClick={() => setCheck('restaurants')} className={check === "restaurants" ? "active nav-link" : "nav-link"}>
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        Restaurants
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a onClick={() => setCheck('users')} className={check === "users" ? "active nav-link" : "nav-link"}>
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        Users
                                    </p>
                                </a>
                            </li>
                            <li className="nav-header">REQUESTS</li>
                            <li className="nav-item">
                                <a onClick={() => setCheck('r_requests')} className={check === "r_requests" ? "active nav-link" : "nav-link"}>
                                    <i className="nav-icon fas fa-calendar-alt" />
                                    <p>
                                        Restaurant Requests
                                        {/* <span className="badge badge-info right">2</span> */}
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a onClick={() => setCheck('d_requests')} className={check === "d_requests" ? "active nav-link" : "nav-link"}>
                                    <i className="nav-icon far fa-image" />
                                    <p>
                                        Dish Requests
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon far fa-envelope" />
                                    <p>
                                        Mailbox
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a  onClick={() => setCheck('mailcomposer')} className={check === "mailcomposer" ? "active nav-link" : "nav-link"}>
                                            <i className="far fa-circle nav-icon" />
                                            <p>Compose</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
            {/* <aside className="control-sidebar control-sidebar-dark">
            </aside> */}

            {/* Header */}
            <nav className="main-header navbar navbar-expand navbar-orange">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><FontAwesomeIcon icon={faBars} /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a onClick={()=>setCheck(null)} className="nav-link">Home</a>
                    </li>
                    {/* <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Contact</a>
                    </li> */}
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* Navbar Search */}
                    {/* Notifications Dropdown Menu */}
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt" />
                        </a>
                    </li>
                </ul>
            </nav>
            {
                check == null && (
                    <Body />
                )
            }
            {
                check === 'restaurants' && (
                    <Restaurants />
                )
            }
            {
                check === 'users' && (
                    <Users />
                )
            }
            {
                check === 'r_requests' && (
                    <Requests />
                )
            }
            {
                check === 'd_requests' && (
                    <DishRequests/>
                )
            }
            {
                check === 'mailcomposer' && (
                    <EmailComposer/>
                )
            }
            <Footer />
        </div>
    )
}