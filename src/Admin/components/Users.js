import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function Users() {
    const [users, setUser] = useState([]);
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                let result = await fetch('http://localhost:8000/api/allusers');
                result = await result.json();
                setUser(result);
            } catch (error) {
                alert(error);
            }
        }
        getData();
    }, [show])
    const blockUser = async () => {
        try {
            let result = await fetch('http://localhost:8000/api/blockUser?user_id=' + id + '&status=' + status);
            result = await result.json();
            alert(result.message);
            setShow(false);
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div>
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        status == 'block' ?
                            (
                                <div>
                                    <h5>Do you want to block the user?</h5>
                                    <p>Blocking the user will restrict the user.</p>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="secondary" onClick={() => setShow(false)}>No</Button>
                                        <Button variant="danger ml-2" onClick={blockUser}>Yes</Button>
                                    </div>
                                </div>
                            ) :
                            (
                                <div>
                                    <h5>Do you want to unblock the user?</h5>
                                    <p>Unblocking the user will unrestrict the user.</p>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="secondary" onClick={() => setShow(false)}>No</Button>
                                        <Button variant="success ml-2" onClick={blockUser}>Yes</Button>
                                    </div>
                                </div>
                            )
                    }
                </Modal.Body>
            </Modal>
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
                                        <h3 className="card-title">Users</h3>
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
                                    <div className="card-body table-responsive p-0" style={{ height: 300 }}>
                                        <table className="table table-head-fixed text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Status</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.map((user) => (
                                                        <tr>
                                                            <td>{user.id}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.status}</td>
                                                            <td></td>
                                                            <td>
                                                                {
                                                                    user.status === 'active' ?
                                                                        (
                                                                            <button onClick={() => setId(user.id) + setShow(true) + setStatus('block')} type="button" class="btn btn-block btn-danger btn-sm">Block</button>
                                                                        ) :
                                                                        (
                                                                            <button onClick={() => setId(user.id) + setShow(true) + setStatus('active')} type="button" class="btn btn-block btn-success btn-sm">Active</button>
                                                                        )
                                                                }
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
