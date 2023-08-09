import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useNavigate } from 'react-router-dom';

export default function Restaurants() {
    const Navigate=useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            let result = await fetch('http://localhost:8000/api/allrestaurants');
            result = await result.json();
            setData(result);
        }
        getData();
    }, []);

    const options = {
        items: 3,
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {   
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    };

    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="text-center">
                        <h5 className="section-title ff-secondary text-center text-primary fw-normal">Testimonial</h5>
                        <h1 className="mb-5">Our Restaurants</h1>
                    </div>
                    <OwlCarousel className="owl-theme" {...options}>
                        {data.map((item) => (
                            <div key={item.id} className="item text-center">
                                <img src={'http://localhost:8000/'+item.logo} alt="Restaurant 1" />
                                <h2  className="text-center">{item.r_name}</h2>
                                <p  className="text-center">{item.owner}</p>
                                <a onClick={()=>Navigate('/restaurant_profile',
                                {state:{
                                        restaurant_id:item.id,
                                        restaurant_name:item.r_name
                                }
                            })}  className="text-center">Read More</a>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>
        </div>
    );
}
