import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import ChartDemo from './ChartDemo';
export default function Body() {
    const [data, setData] = useState([]);
    const [recentRestaurants, setRecentRestaurants] = useState([]);
    const [adUrl, setAdUrl] = useState('');

    useEffect(() => {
        async function getData() {
            let result = await fetch('http://localhost:8000/api/allrequests');
            result = await result.json();
            setData(result)
        }

        async function getRestaurants() {
            let result = await fetch('http://localhost:8000/api/recentRestaurants');
            result = await result.json();
            setRecentRestaurants(result)
        }
        getData();
        getRestaurants();
    }, [])

    const handleAdUpload = async(e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('url', file);
        let result = await fetch('http://localhost:8000/api/uploadAd', {
            method: 'POST',
            body: formData,
        });
        result = await result.json();
        alert(result);
        const reader = new FileReader();

        reader.onload = () => {
            setAdUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleAdRemove = () => {
        setAdUrl('');
    };
    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {/* Info boxes */}
                        {/* <div className="row">
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box">
                                    <span className="info-box-icon bg-info elevation-1"><i className="far fa-cutlery" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Restaurants</span>
                                        <span className="info-box-number">
                                            10
                                            <small>%</small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-user-plus" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Requests</span>
                                        <span className="info-box-number">748738</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Dishes</span>
                                        <span className="info-box-number">760</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Users</span>
                                        <span className="info-box-number">2,000</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* /.row */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">Monthly Recap Report</h5>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                                    <i className="fas fa-wrench" />
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right" role="menu">
                                                    <a href="#" className="dropdown-item">Action</a>
                                                    <a href="#" className="dropdown-item">Another action</a>
                                                    <a href="#" className="dropdown-item">Something else here</a>
                                                    <a className="dropdown-divider" />
                                                    <a href="#" className="dropdown-item">Separated link</a>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                                                <i className="fas fa-times" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* /.card-header */}
                                    <ChartDemo />
                                    {/* ./card-body */}

                                    {/* /.card-footer */}
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                        {/* Main row */}
                        <div className="row">
                            {/* Left col */}
                            {/* MAP & BOX PANE */}

                            {/* /.card */}
                            {/* /.col */}
                            <div className="col-md-6">
                                {/* USERS LIST */}
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Latest Members</h3>
                                        <div className="card-tools">
                                            <span className="badge badge-danger">8 New Members</span>
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
                                        <ul className="users-list clearfix">
                                            {
                                                recentRestaurants.map((restaurant) => (
                                                    <li>
                                                        <img className='restaurantlogo' src={'http://localhost:8000/' + restaurant.logo} alt="User Image" />
                                                        <a className="users-list-name" href="#">{restaurant.r_name}</a>
                                                        <span className="users-list-date">{restaurant.address}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        {/* /.users-list */}
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer text-center">
                                        {/* <a href="javascript:">View All Users</a> */}
                                    </div>
                                    {/* /.card-footer */}
                                </div>
                                {/*/.card */}
                            </div>
                            {/* /.col */}
                            {/* /.row */}
                            {/* TABLE: LATEST ORDERS */}
                            {/* /.col */}
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Recently Added Products</h3>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                                                <i className="fas fa-times" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        {adUrl ? (
                                            <div className="ad-section">
                                                <button className="close-button" onClick={handleAdRemove}>
                                                    &#x2716;
                                                </button>
                                                <img className="ad-image" src={adUrl} alt="Advertisement" />
                                            </div>
                                        ) : (
                                            <div className="upload-section">
                                                <label htmlFor="ad-upload" className="upload-label">
                                                    Click to Upload Ad
                                                </label>
                                                <input
                                                    id="ad-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAdUpload}
                                                    className="upload-input"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-footer text-center">
                                        {/* <a href="javascript:void(0)" className="uppercase">
                                            View All Products
                                        </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header border-transparent">
                                        <h3 className="card-title">Latest Requests</h3>
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
                                                        <th>Request ID</th>
                                                        <th>Owner</th>
                                                        <th>Status</th>
                                                        <th>Email Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.map((item) => (
                                                            <tr>
                                                                <td><a href="pages/examples/invoice.html">{item.id}</a></td>
                                                                <td>{item.owner}</td>
                                                                <td>
                                                                    {
                                                                        item.status === 'accepted' && (
                                                                            <span className="badge badge-success">{item.status}</span>
                                                                        )
                                                                    }
                                                                    {
                                                                        item.status === 'rejected' && (
                                                                            <span className="badge badge-danger">{item.status}</span>
                                                                        )
                                                                    }
                                                                    {
                                                                        item.status === 'pending' && (
                                                                            <span className="badge badge-primary">{item.status}</span>
                                                                        )
                                                                    }

                                                                </td>
                                                                <td>
                                                                    <div className="sparkbar" data-color="#00a65a" data-height={20}>{item.email}</div>
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
                        {/* /.row */}
                    </div>{/*/. container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </div>

    )
}
