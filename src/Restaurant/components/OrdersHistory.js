import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';

export default function OrdersHistory() {
    const [restaurant_id, setRestaurantId] = useState(null);
    const [data, setData] = useState([]);
    const [restaurant_info, setRestaurantinfo] = useState([]);



    useEffect(() => {
        setRestaurantinfo(JSON.parse(localStorage.getItem('Restaurant-info')));
        if (restaurant_info.length !== 0) {
            setRestaurantId(restaurant_info.id);
        }
    }, [restaurant_info.length])

    useEffect(() => {
        async function getOrders() {
            let item = restaurant_id;
            let result = await fetch("http://localhost:8000/api/OrdersHistory?restaurant_id=" + item)
            result = await result.json();
            setData(result);
        }
        if (restaurant_id != null) {
            getOrders();
        }
    }, [restaurant_id])


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Orders History</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header border-transparent">
                                <h3 className="card-title">All Orders</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <i className="fas fa-minus" />
                                    </button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table m-0">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer Name</th>
                                                <th>Status</th>
                                                <th>Total Amount</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((item) => (
                                                    <tr>
                                                        <td>{item.order?.id}</td>
                                                        <td>{item.user?.name}</td>
                                                        <td>
                                                            {
                                                                item.order?.status === 'Completed' && (
                                                                    <span className="badge badge-primary">{item.order?.status}</span>
                                                                )
                                                            }
                                                            {
                                                                item.order?.status === 'Cancelled' && (
                                                                    <span className="badge badge-danger">{item.order?.status}</span>
                                                                )
                                                            }
                                                            {
                                                                item.order?.status === 'rated' && (
                                                                    <span className="badge badge-success">{item.order?.status}</span>
                                                                )
                                                            }

                                                        </td>
                                                        <td>
                                                            <div className="sparkbar" data-color="#00a65a" data-height={20}>{item.order?.amount}</div>
                                                        </td>
                                                        <td>
                                                            <div className="sparkbar" data-color="#00a65a" data-height={20}>{item.order?.date.substring(0, 10)}</div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer clearfix">
                                {/* <a href="javascript:void(0)" className="btn btn-sm btn-secondary float-right">View All Orders</a> */}
                            </div>
                            {/* /.card-footer */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
