import React, { useEffect, useState } from 'react'
import { Form, Modal, ModalHeader } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { tab } from '@testing-library/user-event/dist/tab';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/FirebaseConfig';

export default function Body() {
    const [tables, setTables] = useState([]);
    const [orders, setOrders] = useState([]);
    const [restaurant_id, setRestaurantId] = useState(null);
    const [table_no, setTableNo] = useState(null);
    const [seat_capacity, setSeatCapacity] = useState(null);
    const [table_location, setTableLocation] = useState(null);
    const [status, setStatus] = useState(null);
    const [tableId, setTableId] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState(null);
    const [isOrderChange, setIsOrderChange] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [orderUpdate, setOrderUpdate] = useState(null);
    const [show, setShow] = useState(false);
    const [QRshow, setQRshow] = useState(false);
    const [QR_value, setQR_value] = useState(null);
    const [restaurant_info, setRestaurantinfo] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const mystatus = [
        { id: "1", name: "Available" },
        { id: "2", name: "Reserved" },
        { id: "3", name: "Occupied" },
        { id: "4", name: "Out of service" },
    ];
    const mylocation = [
        { id: "1", name: "Indoor" },
        { id: "2", name: "Outdoor" }
    ];
    const QRCodeGenerator = ({ value }) => {
        const downloadQRCode = () => {
            const qrCodeElement = document.getElementById('qrcode');

            html2canvas(qrCodeElement)
                .then((canvas) => {
                    const qrCodeImage = canvas.toDataURL('image/png');
                    const downloadLink = document.createElement('a');
                    downloadLink.href = qrCodeImage;
                    downloadLink.download = 'qrcode.png';
                    downloadLink.click();
                });
        };
        return (
            <div className="text-center">
                <div className="mb-4">
                    <QRCodeCanvas id="qrcode" value={value} />
                </div>
                <button className="btn btn-sm btn-primary" onClick={downloadQRCode}>Download QR Code</button>
            </div>
        );
    };
    useEffect(() => {
        setRestaurantinfo(JSON.parse(localStorage.getItem('Restaurant-info')));
        if (restaurant_info.length !== 0) {
            setRestaurantId(restaurant_info.id);
        }
    }, [restaurant_info.length])

    useEffect(() => {
        async function getData() {
            let item = restaurant_id;
            let result = await fetch("http://localhost:8000/api/allTable?restaurant_id=" + item)
            result = await result.json();
            setTables(result);
        }
        if (restaurant_id != null) {
            getData();
        }
    }, [restaurant_id, show])

    useEffect(() => {
        console.log(orders)
    }, [orders])
    async function getOrders() {
        let item = restaurant_id;
        let result = await fetch("http://localhost:8000/api/pendingOrders?restaurant_id=" + restaurant_id)
        result = await result.json();
        setOrders(result);
    }
    useEffect(() => {
        if (restaurant_id != null) {
            getOrders();
        }
    }, [restaurant_id, reload, isOrderChange])

    useEffect(() => {
        const getData = async () => {
            const restaurantDocRef = doc(db, "restaurants", restaurant_id.toString());

            const unsubscribe = onSnapshot(restaurantDocRef, (doc) => {
                const flag = doc.data()?.flag;

                if (flag) {
                    getOrders();
                    setDoc(restaurantDocRef, { flag: false });
                }
            });

            return () => unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
        };

        if (restaurant_id) {
            getData();
        }
    }, [restaurant_id]);


    useEffect(() => {
        async function getData() {
            let item = restaurant_id;
            let result = await fetch("http://localhost:8000/api/updateTable?id=" + tableId + "&status=" + statusUpdate)
            result = await result.json();
            alert(result);
        }
        if (tableId !== null) {
            getData();
        }
    }, [tableId, statusUpdate])
    const saveData = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('table_no', table_no);
        formData.append('seat_capacity', seat_capacity);
        formData.append('table_location', table_location);
        formData.append('status', status);
        formData.append('restaurant_id', restaurant_id);

        try {
            let response = await fetch('http://localhost:8000/api/restaurantTable', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                throw new Error(errorResponse);
            }

            const successResponse = await response.json();
            // setLoading(false);
            alert(successResponse);
            setTableNo('');
            setSeatCapacity('');
            setStatus(null);
            setTableLocation(null);
        } catch (error) {
            // setLoading(false);
            alert(error);
        }
    }

    useEffect(() => {
        async function responceOrder() {
            let item = restaurant_id;
            let result = await fetch("http://localhost:8000/api/responceOrder?orderId=" + orderId + "&status=" + orderUpdate)
            result = await result.json();
            alert(result.message);
        }
        if (orderId !== null) {
            responceOrder();
            setIsOrderChange(!isOrderChange);
        }
    }, [orderId, orderUpdate])

    return (
        <div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>Edit Table</Modal.Header>
                <Modal.Body>
                    <>
                        <form id='form' onSubmit={saveData}>
                            <div className="text-center mb-1">
                                <h5 className="mt-1 mb-2">Table Detail</h5>
                                <div className='mt-4'>
                                    <input value={table_no} onChange={(text) => setTableNo(text.target.value)} min={1} type="number" id="form29" className="form-control form-control-sm" placeholder='Table No' />
                                </div>
                                <div className='mt-4'>
                                    <input value={seat_capacity} onChange={(text) => setSeatCapacity(text.target.value)} min={1} type="number" id="form29" className="form-control form-control-sm" placeholder='Seat Capacity' />
                                </div>
                                <div className='mt-4'>
                                    <Form.Select size='md' onChange={(e) => setStatus(e.target.value)}>
                                        <option>Select Category</option>
                                        {
                                            mystatus.map((item) => (
                                                <option value={item.name}>{item.name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </div>
                                <div className='mt-4'>
                                    <Form.Select size='md' onChange={(e) => setTableLocation(e.target.value)}>
                                        <option>Select Category</option>
                                        {
                                            mylocation.map((item) => (
                                                <option value={item.name}>{item.name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </div>
                                {
                                    table_no != null && seat_capacity != null && status != null && table_location != null && (
                                        <div className="text-center mt-4">
                                            <button type='submit' className="btn btn-success text-white btn-lg mt-1">Save<i className="fas fa-sign-in ml-1" /></button>
                                        </div>
                                    )
                                }
                            </div>
                        </form>
                    </>
                </Modal.Body>
            </Modal>
            <Modal show={QRshow} onHide={() => setQRshow(false)}>
                <Modal.Header closeButton>
                    QR Code
                </Modal.Header>
                <Modal.Body>
                    <QRCodeGenerator value={QR_value} />
                </Modal.Body>
            </Modal>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a>Home</a></li>
                                    {/* <li className="breadcrumb-item active">Restaurant Requests</li> */}
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className='row'>
                        <div className="col-md-12">
                            {/* Info Boxes Style 2 */}
                            {/* /.card */}
                            {/* PRODUCT LIST */}
                            <div className="card">
                                <div className="card-header border-transparent">
                                    <h3 className="card-title">Latest Requests</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                        <button type="button" onClick={() => setReload(!reload)} className="btn btn-tool">
                                            <i className="fas fa-redo" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table m-0">
                                            <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Customer Name</th>
                                                    <th>Dishes</th>
                                                    <th>Total Amount</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orders.map((order) => (
                                                        <tr>
                                                            <td>{order.order?.id}</td>
                                                            <td>{order.user?.name}</td>
                                                            <td>
                                                                <table className="table m-0">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Dish</th>
                                                                            <th>Serving Size</th>
                                                                            <th>Quantity</th>
                                                                            <th> <span onClick={toggleDropdown} className="pointer">{isDropdownOpen ? '▲' : '▼'}</span></th>
                                                                        </tr>
                                                                    </thead>
                                                                    {
                                                                        isDropdownOpen && (
                                                                            <tbody>
                                                                                {order.dishes.map((dish) => (
                                                                                    <tr key={dish.id}>
                                                                                        <td>{dish.item_name}</td>
                                                                                        <td>{dish.serving_size}</td>
                                                                                        <td>{dish.quantity}</td>
                                                                                        <td></td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        )
                                                                    }

                                                                </table>
                                                            </td>
                                                            <td>Rs-{order.order?.amount}</td>
                                                            {
                                                                order.order?.status === 'pending' ? (
                                                                    <>
                                                                        <td>
                                                                            <button onClick={() => {
                                                                                setOrderId(order.order?.id);
                                                                                setOrderUpdate('accept')
                                                                            }} type="button" class="btn btn-block btn-success btn-sm">Accept</button>
                                                                        </td>
                                                                        <td>
                                                                            <button onClick={() => {
                                                                                setOrderId(order.order?.id);
                                                                                setOrderUpdate('reject')
                                                                            }} type="button" class="btn btn-block btn-danger btn-sm">Cancel</button>
                                                                        </td>
                                                                    </>

                                                                ) :
                                                                    (
                                                                        <td>
                                                                            <button onClick={() => {
                                                                                setOrderId(order.order?.id);
                                                                                setOrderUpdate('complete')
                                                                            }} type="button" class="btn btn-block btn-success btn-sm">Complete</button>
                                                                        </td>
                                                                    )
                                                            }
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="card">
                                <div className="card-header border-transparent">
                                    <h3 className="card-title">Available Tables</h3>
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
                                                    <th>Table ID</th>
                                                    <th>Table No</th>
                                                    <th>Location</th>
                                                    <th>QR value</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tables.map((table) => (
                                                        <tr key={table.id}>
                                                            <td><a>{table.id}</a></td>
                                                            <td>{table.table_no}</td>
                                                            <td>{table.table_location}</td>
                                                            <td><button className='btn btn-sm btn-success' onClick={() => setQRshow(true) + setQR_value(table.QR_value)}>QR Code</button></td>
                                                            <td>
                                                                <Form.Select size="sm" onChange={(e) => setStatusUpdate(e.target.value, setTableId(table.id))} value={table.statusUpdate}>
                                                                    <option value={table.status}>{table.status}</option>
                                                                    {mystatus.map((item) => (
                                                                        item.name !== table.status && <option key={item.name} value={item.name}>{item.name}</option>
                                                                    ))}
                                                                </Form.Select>
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
                                    <a onClick={() => setShow(true)} className="btn btn-sm btn-secondary float-right">Add Table</a>
                                </div>
                                {/* /.card-footer */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
