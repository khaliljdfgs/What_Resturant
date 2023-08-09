import React, { useEffect, useState } from 'react'
import Body from './components/Body'
import Header from './components/Header'
import Menu from './components/Menu'
import RestaurantMenu from './components/RestaurantMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons'
import AcceptedItemRequest from './components/AcceptedItemRequest'
import PendingItemRequest from './components/PendingItemRequest'
import RejectedItemRequest from './components/RejectedItemRequest'
import TableReservationRequets from './components/TableReservationRequets'
import { useNavigate } from 'react-router-dom'
import Check from './components/Check'
import OrdersHistory from './components/OrdersHistory'

export default function RestaurantDashboard() {
  const [restaurant_info, setRestaurantinfo] = useState([]);
  const [restaurant_id, setRestaurantId] = useState(null);
  const [check, setCheck] = useState(null);
  const [reservationCount, setReservationCount] = useState(0);
  const Navigate = useNavigate();



  useEffect(() => {
    setRestaurantinfo(JSON.parse(localStorage.getItem('Restaurant-info')));
    if (restaurant_info.length !== 0) {
      setRestaurantId(restaurant_info.id);
    }
  }, [restaurant_info.length])
  useEffect(() => {
    async function getData() {
      let item = restaurant_id;
      console.log(item);
      let result = await fetch("http://localhost:8000/api/getRestaurantReservationRequestsCount?restaurant_id=" + item)
      result = await result.json();
      setReservationCount(result);
    }
    if (restaurant_id != null) {
      getData();
    }
  }, [restaurant_id])

  const LogOut = () => {
    localStorage.clear('Restaurant-info');
    Navigate('/');
  }
  return (
    <div>
      {/* Header */}
      <nav className="main-header navbar navbar-expand navbar-orange">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><FontAwesomeIcon icon={faBars} /></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a onClick={() => setCheck(null)} className={"nav-link"} >Home</a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
              <i className="fas fa-th-large" />
            </a>
          </li> */}
          <li className="nav-item d-none d-sm-inline-block">
            <a onClick={LogOut} className='nav-link pointer'>Logout</a>
          </li>
        </ul>
      </nav>

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
              <a className="d-block">{restaurant_info.r_name}</a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
 with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <a className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Menu Management
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className={"nav-item"}>
                    <a onClick={() => setCheck('menu')} className={check === "menu" ? "active nav-link" : "nav-link"}>
                      <i className="far fa-circle nav-icon" />
                      <p>Menu</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="nav-icon fas fa-tachometer-alt" />
                      <p>
                        Requests
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a onClick={() => setCheck('rejected_requets')} className={check === "rejected_requets" ? "active nav-link" : "nav-link"}>
                          <i className="far fa-circle nav-icon" />
                          <p>Rejected</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a onClick={() => setCheck('accepted_requets')} className={check === "accepted_requets" ? "active nav-link" : "nav-link"}>
                          <i className="far fa-circle nav-icon" />
                          <p>Accepted</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a onClick={() => setCheck('pending_requets')} className={check === "pending_requets" ? "active nav-link" : "nav-link"}>
                          <i className="far fa-circle nav-icon" />
                          <p>Pending</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a onClick={() => setCheck('reservation_request')} className={check === "reservation_request" ? "active nav-link" : "nav-link"}>
                  <i className="nav-icon fas fa-th" />
                  <p>
                    Reservation Requets
                    {
                      reservationCount !== 0 && (
                        <span className="right badge badge-success">{reservationCount}</span>
                      )
                    }
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={() => setCheck('ordersHistory')} className={check === "ordersHistory" ? "active nav-link" : "nav-link"}>
                  <i className="nav-icon fas fa-th" />
                  <p>
                    Orders History
                  </p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
      <aside className="control-sidebar control-sidebar-dark">
        {/* Control sidebar content goes here */}
      </aside>
      {/* <Body/> */}
      {
        check == null &&
        (
          <Body />
        )
      }
      {
        check === 'menu' &&
        (
          <RestaurantMenu />
        )
      }
      {
        check === 'accepted_requets' &&
        (
          <AcceptedItemRequest />
        )
      }
      {
        check === 'rejected_requets' &&
        (
          <RejectedItemRequest />
        )
      }
      {
        check === 'pending_requets' &&
        (
          <PendingItemRequest />
        )
      }
      {
        check === 'reservation_request' &&
        (
          <TableReservationRequets />
        )
      }
      {
        check === 'ordersHistory' &&
        (
          <OrdersHistory />
        )
      }
    </div>
  )
}
