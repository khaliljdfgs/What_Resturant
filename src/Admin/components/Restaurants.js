import React from 'react'
import { useState, useEffect } from 'react'

export default function Restaurants() {

    const [restaurants, setRestaurant] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                let result = await fetch('http://localhost:8000/api/allrestaurants');
                result = await result.json();
                setRestaurant(result);
            } catch (error) {
                alert(error);
            }
        }
        getData();
    }, [])
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <section className="content">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className="col-md-12">
                                {/* USERS LIST */}
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">All Restaurants</h3>
                                        {/* <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{ width: 150 }}>
                                                <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-default">
                                                        <i className="fas fa-search" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body p-0">
                                        <ul className="users-list1 clearfix">
                                            {
                                                restaurants.map((restaurant) => (
                                                    <li>
                                                        <img src={'http://localhost:8000/' + restaurant.logo} alt="User Image" />
                                                        <a className="users-list-name">{restaurant.r_name}</a>
                                                        <span className="users-list-date">{restaurant.address}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        {/* /.users-list */}
                                    </div>
                                </div>
                                {/*/.card */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
