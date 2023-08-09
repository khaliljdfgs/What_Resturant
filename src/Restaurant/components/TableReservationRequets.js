import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Form, Modal, Spinner } from 'react-bootstrap';

export default function TableReservationRequets() {
    const [reservationRequests, setReservationRequests] = useState([]);
    const [allTable, setTables] = useState([]);
    const [showSpecialRequests, setShowSpecialRequests] = useState(false);
    const [showAction, setShowAction] = useState(false);
    const [specialRequest, setspecialRequests] = useState(null);
    const [restaurant_id, setRestaurantId] = useState(null);
    const [request_id, setRequestId] = useState(null);
    const [table_id, setTableId] = useState('');
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [rejected_reason, setReason] = useState('');
    const [restaurant_info, setRestaurantinfo] = useState([]);
    const [time12hr, setTime12hr] = useState('');
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setRestaurantinfo(JSON.parse(localStorage.getItem('Restaurant-info')));
        if (restaurant_info.length !== 0) {
            setRestaurantId(restaurant_info.id);
        }
    }, [restaurant_info.length])

    useEffect(() => {
        async function getRequests() {
            let item = restaurant_id;
            console.log(item);
            let result = await fetch("http://localhost:8000/api/tableReservationRequests?restaurant_id=" + item + "&status=pending")
            result = await result.json();
            setReservationRequests(result);
        }
        async function getTables() {
            let item = restaurant_id;
            console.log(item);
            let result = await fetch("http://localhost:8000/api/allTable?restaurant_id=" + item)
            result = await result.json();
            setTables(result);
        }
        if (restaurant_id != null) {
            getRequests();
            getTables();
        }
    }, [restaurant_id, showAction])

    const handleTimeChange = (event) => {
        const inputTime12hr = event.target.value;
        setTime12hr(inputTime12hr);

        // Convert the 12-hour time to 24-hour format
        const [time, modifier] = inputTime12hr.split(' ');
        const [hours, minutes] = time.split(':');
        let hours24hr = parseInt(hours);

        if (modifier === 'PM' && hours24hr !== 12) {
            hours24hr += 12;
        } else if (modifier === 'AM' && hours24hr === 12) {
            hours24hr = 0;
        }

        // Format the hours and minutes to ensure leading zeroes if necessary
        const formattedHours = hours24hr.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        // Set the time in the 24-hour format
        const formattedTime24hr = `${formattedHours}:${formattedMinutes}`;
        setTime(formattedTime24hr);
    };

    const saveData = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (status === 'accept') {
            const formData = new FormData();
            formData.append('status', status);
            formData.append('date', date);
            formData.append('time', time);
            formData.append('restaurant_id', restaurant_id);
            formData.append('request_id', request_id);
            formData.append('table_id', table_id);


            try {
                let response = await fetch('http://localhost:8000/api/accept_reject_ReserveTable', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const errorResponse = await response.text();
                    throw new Error(errorResponse);
                }

                const successResponse = await response.json();
                alert(successResponse);
                setTableId(null);
                setLoading(false);
                setStatus('');
                setDate('');
                setRequestId(null);
                setTime('');
                setShowAction(false);
            } catch (error) {
                setLoading(false);
                alert(error);
            }
        }
        else {
            const formData = new FormData();
            formData.append('status', status);
            formData.append('rejected_reason', rejected_reason);
            formData.append('restaurant_id', restaurant_id);
            formData.append('request_id', request_id);
            try {
                let response = await fetch('http://localhost:8000/api/accept_reject_ReserveTable', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const errorResponse = await response.text();
                    throw new Error(errorResponse);
                }

                const successResponse = await response.json();
                alert(successResponse);
                setLoading(false);
                setStatus('');
                setReason('');
                setRequestId(null);
                setShowAction(false);
            } catch (error) {
                setLoading(false);
                alert(error);
            }
        }
    }

    return (
        <div className="content-wrapper">
            <Modal show={showSpecialRequests} onHide={() => setShowSpecialRequests(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Special Requests</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-2">
                        {/* Display the special requests here */}
                        <p>{specialRequest}</p>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showAction} onHide={() => setShowAction(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Reserve a Table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={saveData}>
                        {
                            status === 'accept' ?
                                <div className="text-center mb-1">
                                    <div className='mt-4'>
                                        <Form.Select value={table_id} size='sm' onChange={(e) => setTableId(e.target.value)}>
                                            {/* <option>Table Number</option> */}
                                            {
                                                allTable.map((item) => (
                                                    <option value={item.id}>{item.table_no}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </div>
                                    <div className='mt-4'>
                                        <input required value={date} onChange={(text) => setDate(text.target.value)} type="date" id="form29" className="form-control form-control-sm" placeholder='Date' />
                                    </div>
                                    <div className='mt-4'>
                                        <input required value={time} onChange={(text) => setTime(text.target.value)} type="time" id="form29" className="form-control form-control-sm" placeholder='Time' />
                                    </div>
                                    <div className='text-center mt-2'>
                                        <button className="btn btn-primary bt-sm" type='submit'>
                                            {
                                                loading ? (
                                                    <Spinner animation="border" variant="primary" />
                                                ) :
                                                    (
                                                        <span>rESERVE</span>
                                                    )
                                            }
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="text-center mb-1">
                                    <div className='mt-4'>
                                        <textarea value={rejected_reason} onChange={(text) => setReason(text.target.value)} type="text" id="form29" className="form-control form-control-sm" placeholder='Reason to Reject' />
                                    </div>
                                    <div className='text-center mt-2'>
                                        <button className="btn btn-primary bt-sm" type='submit'>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                        }
                    </form>
                </Modal.Body>
            </Modal>
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
                </div>
            </section>
            <section className="content">
                <div className='row'>
                    <div className='col-md-12'>
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
                                                <th>Name</th>
                                                <th>No of People</th>
                                                {/* <th>Email</th> */}
                                                <th>Date&Time</th>
                                                <th>Special Requests</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                reservationRequests.map((reservationRequest) => (
                                                    <tr key={reservationRequest.id}>
                                                        <td><a>{reservationRequest.id}</a></td>
                                                        <td>{reservationRequest.name}</td>
                                                        <td>{reservationRequest.no_of_people}</td>
                                                        {/* <td>{reservationRequest.email}</td> */}
                                                        <td>{reservationRequest.date_time}</td>
                                                        <td className='pointer' onClick={() => setShowSpecialRequests(true) + setspecialRequests(reservationRequest.special_request)}>
                                                            {reservationRequest.special_request.substring(0, 10)}
                                                            {reservationRequest.special_request.length > 10 && '.....'}
                                                        </td>
                                                        <td>
                                                            <button onClick={() => setShowAction(true) + setStatus('accept') + setRequestId(reservationRequest.id)} type="button" class="btn btn-block btn-success btn-sm">Accept</button>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => setShowAction(true) + setStatus('reject') + setRequestId(reservationRequest.id)} type="button" class="btn btn-block btn-danger btn-sm">Reject</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* /.table-responsive */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
