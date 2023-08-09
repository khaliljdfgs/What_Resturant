import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Header from './Header'
import Menu from './Menu'
import ChatMessage from './ChatMessage';
import EmailComposer from './EmailComposer';

export default function Requests() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState(null);
    useEffect(() => {
        async function getData() {
            let result = await fetch('http://localhost:8000/api/all_pending_requests');
            result = await result.json();
            setData(result);

        }
        getData();
        responce();
    }, [status])
    async function responce() {
        if (status === 'accept' || status === 'reject') {
            let item = { status, email };
            let result = await fetch('http://localhost:8000/api/accept_request', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            result = await result.json();
            alert(result);
            setStatus(null);
        }
    }
    return (
        <div>
            <div className='content-wrapper'>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Restaurant Requests</li>
                                </ol>
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div style={{ height: '70vh' }} className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Pending Requests</h3>
                                        <div className="card-tools">
                                            {/* <div className="input-group input-group-sm" style={{ width: 150 }}>
                                                <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-default">
                                                        <i className="fas fa-search" />
                                                    </button>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body table-responsive p-0" style={{ height: 300 }}>
                                        <table className="table table-head-fixed text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Owner</th>
                                                    <th>Restaurant Name</th>
                                                    <th>Location</th>
                                                    <th>Email</th>
                                                    <th>Phone No.</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((item) => (
                                                        <tr>
                                                            <td>{item.id}</td>
                                                            <td>{item.owner}</td>
                                                            <td>{item.restaurant}</td>
                                                            <td>{item.address}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.phone_no}</td>
                                                            <td>
                                                                <button onClick={() => setStatus('accept') + setEmail(item.email)} type="button" class="btn btn-block btn-success btn-sm">Accept</button>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => setStatus('reject') + setEmail(item.email)} type="button" class="btn btn-block btn-danger btn-sm">Reject</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
