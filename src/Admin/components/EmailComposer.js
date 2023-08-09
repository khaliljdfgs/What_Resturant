import React, { useState } from 'react';

export default function EmailComposer() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };


    const handleSendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        // Send the email data to the backend server
        fetch('http://localhost:8000/api/emailComposer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipient,
                subject,
                message,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data);
                setRecipient('');
                setSubject('');
                setMessage('');
                setLoading(false); // Hide loader after email is sent
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

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
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Compose Email</h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <div className="container">
                                            <form id="form" onSubmit={handleSendEmail}>
                                                <label htmlFor="recipient">Recipient:</label>
                                                <input
                                                    type="email"
                                                    id="recipient"
                                                    className="form-control"
                                                    value={recipient}
                                                    onChange={handleRecipientChange}
                                                    required
                                                />

                                                <label htmlFor="subject">Subject:</label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    className="form-control"
                                                    value={subject}
                                                    onChange={handleSubjectChange}
                                                    required
                                                />

                                                <label htmlFor="message">Message:</label>
                                                <textarea
                                                    id="message"
                                                    value={message}
                                                    className="form-control"
                                                    onChange={handleMessageChange}
                                                    required
                                                ></textarea>
                                                {
                                                    isLoading ? <button disabled>Sending...</button>
                                                        :
                                                        <button type="submit">Send Email</button>
                                                }
                                            </form>
                                        </div>
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



    );
}
