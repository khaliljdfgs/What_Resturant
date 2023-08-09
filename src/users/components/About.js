import React from 'react';

export default function About() {
    return (
        <div className='container-xxl bg-white p-0'>
            <div className='container-xxl py-5'>
                <div className='container'>
                    <div className='row g-5 align-items-center'>
                        <div className='col-lg-6'>
                            <div className='row g-3'>
                                <div className='col-6 text-start'>
                                    <img
                                        className='img-fluid rounded w-100 wow zoomIn'
                                        data-wow-delay='0.1s'
                                        src='img/about-1.jpg'
                                        alt='About Image 1'
                                    />
                                </div>
                                <div className='col-6 text-start'>
                                    <img
                                        className='img-fluid rounded w-75 wow zoomIn'
                                        data-wow-delay='0.3s'
                                        src='img/about-2.jpg'
                                        alt='About Image 2'
                                        style={{ marginTop: '25%' }}
                                    />
                                </div>
                                <div className='col-6 text-end'>
                                    <img
                                        className='img-fluid rounded w-75 wow zoomIn'
                                        data-wow-delay='0.5s'
                                        src='img/about-3.jpg'
                                        alt='About Image 3'
                                    />
                                </div>
                                <div className='col-6 text-end'>
                                    <img
                                        className='img-fluid rounded w-100 wow zoomIn'
                                        data-wow-delay='0.7s'
                                        src='img/about-4.jpg'
                                        alt='About Image 4'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <h5 className='section-title ff-secondary text-start text-primary fw-normal'>About Us</h5>
                            <h2 className='mb-4'>
                                Welcome to <i className='fa fa-utensils text-primary me-2' />WhaRestaurant
                            </h2>
                            <p className='mb-4'>
                                We are committed to providing a unique dining experience with a wide range of culinary options. Our
                                dedicated team of chefs and staff ensures that every meal is prepared with passion and served with
                                excellence.
                            </p>
                            <p className='mb-4'>
                                With years of experience in the industry, we have become synonymous with quality and taste. Our
                                ingredients are carefully sourced, and our dishes are crafted to perfection to delight your taste buds.
                                Whether you're looking for a casual dining experience or a special celebration, WhaRestaurant is the
                                perfect choice.
                            </p>
                            <div className='row g-4 mb-4'>
                                <div className='col-sm-6'>
                                    <div className='d-flex align-items-center border-start border-5 border-primary px-3'>
                                        <h1 className='flex-shrink-0 display-5 text-primary mb-0' data-toggle='counter-up'>
                                            15
                                        </h1>
                                        <div className='ps-4'>
                                            <p className='mb-0'>Years of</p>
                                            <h6 className='text-uppercase mb-0'>Experience</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className='btn btn-primary py-3 px-5 mt-2' aria-disabled>
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}