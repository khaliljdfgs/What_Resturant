import React, { useEffect, useState } from 'react'

export default function AcceptedItemRequest() {
    const [data, setData] = useState([]);
   
    const [restaurant_id, setRestaurantId] = useState(null);
    const [restaurant_info, setRestaurantinfo] = useState([]);

    useEffect(() => {
        setRestaurantinfo(JSON.parse(localStorage.getItem('Restaurant-info')));
        if (restaurant_info.length !== 0) {
            setRestaurantId(restaurant_info.id);
        }
    }, [restaurant_info.length])

    useEffect(() => {
        async function getData() {
            let item = restaurant_id ;
            console.log(item);
            let result = await fetch("http://localhost:8000/api/acceptedDishes?restaurant_id=" + item)
            result = await result.json();
            setData(result);
        }
        if (restaurant_id != null) {
            getData();
        }
        console.log(data);
    }, [ restaurant_id])

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
                    </div>
                </section>
                <section className="content">
                    <div className='row'>
                        <div className='col-    md-12'>
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
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table m-0">
                                            <thead>
                                                <tr>
                                                    <th>Item ID</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Description</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((item) => (
                                                        <tr>
                                                            <td>{item.id}</td>
                                                            <td>{item.item_name}</td>
                                                            <td>{item.item_price}</td>
                                                            <td>{item.item_description}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
