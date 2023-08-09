import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Menu(props) {
    const [restaurant_id, setRestaurantId] = useState(props.cmp);
    const [category, setCategory] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [category_id, setCategoryID] = useState(null);
    const [whichCategory, setWhichCategory] = useState(null);

    useEffect(() => {
        async function getCategory() {
            let item = { restaurant_id };
            // let result = await fetch('http://localhost:8000/api/restaurantCategories', {
            //     method: 'POST',
            //     body: JSON.stringify(item),
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     }
            // });
            let result = await fetch("http://localhost:8000/api/restaurantCategories?restaurant_id=" + restaurant_id);
            result = await result.json();
            setCategory(result);
            setWhichCategory('check');
        }
        getCategory();
        if (category.length > 0) {
            setCategoryID(category[0].id);
        }
    }, [whichCategory])
    function displayStars(rating) {
        const starIcons = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starIcons.push(<FontAwesomeIcon icon={faStar}  style={{ fontSize:'15px' }} key={i} className="text-warning" />);
            } else {
                starIcons.push(<FontAwesomeIcon icon={faStar}  style={{ fontSize: '15px' }} key={i} className="text-secondary" />);
            }
        }
        return starIcons;
    }
    useEffect(() => {
        async function getDish() {
            let item = { category_id, restaurant_id };
            let result = await fetch('http://localhost:8000/api/Category_dishes', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            result = await result.json();
            setDishes(result);
        }
        if (category_id != null) {
            getDish();
        }
    }, [category_id])
    return (
        <div className='container-xxl bg-white p-0'>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
                        <h1 className="mb-5">Most Popular Items</h1>
                    </div>
                    <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.1s">
                        <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                            {
                                category.map((item) => (
                                    <li className="nav-item">
                                        <h6 onClick={() => setCategoryID(item.id)} style={{ cursor: 'pointer' }} className={item.id === category_id ? "mt-n1 mb-0 mx-3 ms-0 active" : "mt-n1 mb-0 mx-3 ms-0"}>{item.name}</h6>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    {
                                        dishes.map((dish) => (
                                            <div className="col-lg-6">
                                                <div className="d-flex align-items-center">
                                                    <img className="flex-shrink-0 img-fluid rounded" src={'http://localhost:8000/' + dish.image} alt style={{ width: 80 }} />
                                                    <div className="w-100 d-flex flex-column text-start ps-4">
                                                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                            <span>{dish.item_name}</span>
                                                            <span className="text-primary">{displayStars(dish.avg_rating)}</span>
                                                        </h5>
                                                        <small className="fst-italic">{dish.item_description}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
