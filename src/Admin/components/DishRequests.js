import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';

export default function DishRequests() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(null);
    const [id, setId] = useState(null);
    const [showDescription, setShowDescription] = useState(false);
    const [description, setDescription] = useState('');
    useEffect(() => {
        async function getData() {
            let result = await fetch('http://localhost:8000/api/all_pending_dish_requests');
            result = await result.json();
            setData(result);

        }
        getData();
        responce();
    }, [status])
    async function responce() {
        if (status === 'accept' || status === 'reject') {
            let result = await fetch('http://localhost:8000/api/acceptDish_request?dish_id=' + id + '&status=' + status)
            result = await result.json();
            alert(result.message);
            setStatus(null);
        }
    }
    return (
        <div>
            <Modal show={showDescription} onHide={() => setShowDescription(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-2">
                        {/* Display the special requests here */}
                        <p>{description}</p>
                    </div>
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
                                    <li className="breadcrumb-item"><a>Home</a></li>
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
                                        <h3 className="card-title">Pending Dish Requests</h3>
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
                                                    <th>Dish Name</th>
                                                    <th>Price</th>
                                                    <th>Description</th>
                                                    <th>Restaurant</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((item) => (
                                                        <tr>
                                                            <td>{item.dish?.id}</td>
                                                            <td>{item.dish?.item_name}</td>
                                                            <td>{item.dish?.item_price}</td>
                                                            <td className='pointer' onClick={() => setShowDescription(true) + setDescription(item.dish?.item_description)}>
                                                                {item.dish?.item_description.substring(0, 10)}
                                                                {item.dish?.item_description.length > 10 && '.....'}
                                                            </td>                                                            <td>{item.restaurant?.r_name}</td>
                                                            <td>
                                                                <button onClick={() => setStatus('accept') + setId(item.id)} type="button" class="btn btn-block btn-success btn-sm">Accept</button>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => setStatus('reject') + setId(item.id)} type="button" class="btn btn-block btn-danger btn-sm">Reject</button>
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
