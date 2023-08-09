
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cities() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();


    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1200); // Adjust the breakpoint as needed
        };

        // Add event listener to window resize
        window.addEventListener('resize', handleResize);

        // Call the handler initially to set the initial screen size
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        async function getData() {
            try {
                let result = await fetch('http://localhost:8000/api/cities');
                result = await result.json();
                setCities(result);
                setLoading(false);
            } catch (error) {
                alert(error)
                setLoading(false);
            }
        }
        getData();
    }, [])

    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="text-center">
                        <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                            Testimonial
                        </h5>
                        <h1 className="mb-5">Find us in these cities and many more</h1>
                    </div>
                    <div className={isSmallScreen ? 'city-slider' : 'city-slider-large'}>
                        {cities.map((city) => (
                            <div key={city.name} className="city-card" onClick={() => Navigate('/cityRestaurant',
                                {
                                    state: {
                                        city:city.city_name,
                                        longitude: city.longitude,
                                        latitude: city.latitude
                                    }
                                }
                            )}>
                                <img src={'http://localhost:8000/'+city.image} alt={city.city_name} />
                                <h3 className='city-name'>{city.city_name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
