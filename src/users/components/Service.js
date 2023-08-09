import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';


export default function Service() {
    const Navigate = useNavigate();
    const [status, setStatus] = useState(true);;
    const [inputValue, setInputValue] = useState(null);
    const [restaurant, setRestaurant] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [restaurant_id, setSelectedOption1] = useState(null);


    useEffect(() => {
        async function getData() {
            try {
                let result = await fetch('http://localhost:8000/api/allrestaurants');
                result = await result.json();
                setRestaurant(result);
            } catch (error) {
                alert(error);
            }
        }
        getData();
    }, [])

    useEffect(() => {
        if (inputValue) {
            setFilteredOptions(
                restaurant
                    .map((restaurant) => ({
                        value: restaurant.id,
                        label: restaurant.r_name,
                        logo: "http://localhost:8000/" + restaurant.logo,
                    }))
                    .filter((option) =>
                        option.label && inputValue
                            ? option.label.toLowerCase().includes(inputValue.toLowerCase())
                            : false
                    )
            );
        } else {
            setFilteredOptions(
                restaurant.map((restaurant) => ({
                    value: restaurant.id,
                    label: restaurant.r_name,
                    logo: "http://localhost:8000/" + restaurant.logo,
                }))
            );
        }
    }, [inputValue, restaurant]);

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: '#000', // Set the desired color for the option text
            backgroundColor: state.isFocused ? '#F4F4F4' : 'white', // Set the background color for focused and non-focused options
            ':hover': {
                backgroundColor: '#FF8C00', // Set the background color for the hover state
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#333', // Set the desired color for the selected value text
        }),
    };

    return (
        <div className='container-xxl bg-white p-0'>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-user-tie text-primary mb-4" />
                                    <h5>Register Restaurant</h5>
                                    <button onClick={() => Navigate('/requestform')} type="button" style={{backgroundColor:'#FFC107'}} class="btn btn-sm">Register</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-utensils text-primary mb-4" />
                                    <h5>Compare Restaurants</h5>
                                    <button onClick={() => Navigate('/comparisonscreen')} type="button" style={{backgroundColor:'#FFC107'}} class="btn btn-sm">Compare</button>
                                    {/* <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-cart-plus text-primary mb-3" />
                                    <h5>Reserve Table</h5>
                                    <Select
                                        id="restaurant"
                                        value={restaurant_id}
                                        onInputChange={(text) => setInputValue(text)}
                                        options={filteredOptions}
                                        onChange={(selectedOption) => {
                                            Navigate('/restaurant_profile', {
                                                state: {
                                                    restaurant_id: selectedOption.value,
                                                    restaurant_name: selectedOption.label,
                                                },
                                            });
                                        }}
                                        placeholder="Select a restaurant"
                                        isSearchable
                                        getOptionValue={(option) => option.value}
                                        isClearable
                                        isOptionSelected={(option) => option.value === restaurant_id?.value}
                                        styles={customStyles} // Apply custom styles to the Select component
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
