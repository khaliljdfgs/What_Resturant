import React from 'react'
import Footer from './components/Footer'
import Service from './components/Service'
import Header1 from './Header1'

export default function ServicePage() {
    return (
        <div className='container-xxl bg-white p-0'>
            <Header1 />
            <div class="container-xxl py-5 bg-dark hero-header mb-5">
                <div class="container text-center my-5 pt-5 pb-4">
                    <h1 class="display-3 text-white mb-3 animated slideInDown">Services</h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb justify-content-center text-uppercase">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Pages</a></li>
                            <li class="breadcrumb-item text-white active" aria-current="page">Service</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <Service />
            <Footer />
        </div>
    )
}
