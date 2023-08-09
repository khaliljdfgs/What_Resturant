import { faL } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'

export default function Reservation(props) {
    const [restaurant_id, setRestaurantId] = useState(props.cmp);
    const [name, setName] = useState(null);
    const [user, setUser] = useState();
    const [email, setEmail] = useState(null);
    const [date_time, setDate_time] = useState(null);
    const [no_of_people, setNo_of_people] = useState(null);
    const [special_request, setSpecial_request] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('User-info')) {
            setUser(JSON.parse(localStorage.getItem("User-info")));
        }
    }, [])

    const saveData = async (e) => {
        e.preventDefault();
        if (user)
        {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('date_time', date_time);
            formData.append('no_of_people', no_of_people);
            formData.append('special_request', special_request);
            formData.append('restaurant_id', restaurant_id);
            formData.append('user_id', user.id);
    
            try {
                let response = await fetch('http://localhost:8000/api/reserveTable', {
                    method: 'POST',
                    body: formData
                });
    
                if (!response.ok) {
                    const errorResponse = await response.text();
                    throw new Error(errorResponse);
                }
    
                const successResponse = await response.json();
                alert(successResponse);
                setIsLoading(false);
                setName('');
                setEmail('');
                setDate_time('');
                setNo_of_people('');
                setSpecial_request('');
            } catch (error) {
                alert(error);
            }
        }
        else{
            alert("Pease login to reserve a Table")
        }
    }

    const handleDateTimeChange = (event) => {
        const selectedDateTime = event.target.value;
        const currentDateTime = new Date().toISOString().slice(0, 16); // Get current date and time in "yyyy-MM-ddTHH:mm" format

        if (selectedDateTime >= currentDateTime) {
            setDate_time(selectedDateTime);
        } else {
            // Display an error message or handle the invalid selection
            alert('Please select valid date and time');
        }
    };

    return (
        <div className='container-xxl bg-white p-0'>
            <div className="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="video">
                            <button type="button" className="btn-play" data-bs-toggle="modal" data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-bs-target="#videoModal">
                                <span />
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 bg-dark d-flex align-items-center">
                        <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
                            <h5 className="section-title ff-secondary text-start text-primary fw-normal">Reservation</h5>
                            <h1 className="text-white mb-4">Book A Table Online</h1>
                            <form onSubmit={saveData}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input required value={name} type="text" onChange={(text) => setName(text.target.value)} className="form-control" id="name" placeholder="Your Name" />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input required value={email} type="email" onChange={(text) => setEmail(text.target.value)} className="form-control" id="email" placeholder="Your Email" />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating date" id="date3" data-target-input="nearest">
                                            <input
                                                type="datetime-local"
                                                required
                                                value={date_time}
                                                onChange={handleDateTimeChange}
                                                className="form-control datetimepicker-input"
                                                id="datetime"
                                                placeholder="Date & Time"
                                            />
                                            <label htmlFor="datetime">Date &amp; Time</label>
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <select required value={no_of_people} className="form-select" id="select1" onChange={(value) => setNo_of_people(value.target.value)}>
                                                <option value={1}>People 1</option>
                                                <option value={2}>People 2</option>
                                                <option value={3}>People 3</option>
                                                <option value={4}>People 3</option>
                                                <option value={5}>People 3</option>
                                            </select>
                                            <label htmlFor="select1">No Of People</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea required value={special_request} className="form-control" onChange={(text) => setSpecial_request(text.target.value)} placeholder="Special Request" id="message" style={{ height: 100 }} defaultValue={""} />
                                            <label htmlFor="message">Special Request</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit" disabled={isLoading}>
                                            {isLoading ? 'Sending...' : 'Book Now'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="videoModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Youtube Video</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {/* 16:9 aspect ratio */}
                            <div className="ratio ratio-16x9">
                                <iframe className="embed-responsive-item" src id="video" allowFullScreen allowscriptaccess="always" allow="autoplay" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
