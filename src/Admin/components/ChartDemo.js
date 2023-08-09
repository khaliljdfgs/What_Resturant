import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function ChartDemo() {
    const [restaurant1, setRestaurant1] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                let result = await fetch('http://localhost:8000/api/restaurantInfo');
                result = await result.json();
                setRestaurant1(result);
            } catch (error) {
                alert(error);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        if (restaurant1.length > 0) {
            const fetchCityNames = async () => {
                const updatedRestaurants = await Promise.all(
                    restaurant1.map(async (item) => ({
                        name: item.r_name,
                        city: await getCityName(item.latitude, item.longitude),
                    }))
                );

                setRestaurants(updatedRestaurants);
            };

            fetchCityNames();
        }
    }, [restaurant1]);

    useEffect(() => {
        if (restaurants.length > 0) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const ctx = document.getElementById('restaurant-chart');
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: cityNames,
                    datasets: [
                        {
                            label: 'Number of Restaurants',
                            data: restaurantCounts,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)', // Adjust the color as per your preference
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            barPercentage: 0.7,
                            categoryPercentage: 0.7,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true,
                            maxTicksLimit: 20, // Maximum number of ticks to display on the x-axis
                            maxRotation: 0, // Disable label rotation
                            ticks: {
                                stepSize: 20, // Step size between each tick
                            },
                        },
                        y: {
                            beginAtZero: true,
                            precision: 0, // Disable decimal places on the y-axis labels
                        },
                    },
                },
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [restaurants]);

    const getCityName = async (latitude, longitude) => {
        const accessToken = 'pk.eyJ1Ijoic2hhbmkzMiIsImEiOiJjbGl2enFsdHMwbmMyM2pvMmhjamFocW4zIn0.qn7A21vSUGbMhTefdH5iYg';
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.features && data.features.length > 0) {
                const cityName = data.features[0].context.find((context) => context.id.includes('place')).text;
                console.log('City Name:', cityName);
                return cityName;
            } else {
                console.log('City Name not found');
                return 'Unknown';
            }
        } catch (error) {
            console.error('Error:', error);
            return 'Unknown';
        }
    };

    // Count the number of restaurants in each city
    const cityCounts = restaurants.reduce((acc, restaurant) => {
        const { city } = restaurant;
        if (acc[city]) {
            acc[city]++;
        } else {
            acc[city] = 1;
        }
        return acc;
    }, {});

    const cityNames = Object.keys(cityCounts);
    const restaurantCounts = Object.values(cityCounts);

    const chartRef = useRef(null);

    return (
        <>
            <div className="card-body">
                <div className='row'>
                    <div className="col-md-12">
                        <p className="text-center">
                            <strong>Number of Restaurants per City</strong>
                        </p>
                        <div className='chart'>
                            <canvas id="restaurant-chart" />
                        </div>
                    </div>

                </div>
            </div>
            <div className="card-footer">
                {/* <div className="row">
                    <div className="col-sm-3 col-6">
                        <div className="description-block border-right">
                            <span className="description-percentage text-success"><i className="fas fa-caret-up" /> 17%</span>
                            <h5 className="description-header">$35,210.43</h5>
                            <span className="description-text">TOTAL REVENUE</span>
                        </div>
                    </div>
                    <div className="col-sm-3 col-6">
                        <div className="description-block border-right">
                            <span className="description-percentage text-warning"><i className="fas fa-caret-left" /> 0%</span>
                            <h5 className="description-header">$10,390.90</h5>
                            <span className="description-text">TOTAL COST</span>
                        </div>
                    </div>
                    <div className="col-sm-3 col-6">
                        <div className="description-block border-right">
                            <span className="description-percentage text-success"><i className="fas fa-caret-up" /> 20%</span>
                            <h5 className="description-header">$24,813.53</h5>
                            <span className="description-text">TOTAL PROFIT</span>
                        </div>
                    </div>
                    <div className="col-sm-3 col-6">
                        <div className="description-block">
                            <span className="description-percentage text-danger"><i className="fas fa-caret-down" /> 18%</span>
                            <h5 className="description-header">1200</h5>
                            <span className="description-text">GOAL COMPLETIONS</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </>

    );
}









