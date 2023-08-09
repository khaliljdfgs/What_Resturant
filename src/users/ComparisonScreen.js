
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Footer from './components/Footer'
import Header from './components/Header';

export default function ComparisonScreen() {
    const [data, setData] = useState([]);
    const [restaurant1_id, setSelectedOption1] = useState(null);
    const [restaurant2_id, setSelectedOption2] = useState(null);
    const [category_id, setSelectedCategory] = useState(null);
    const [comparison_result, setComparisonresult] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [restaurant1name, setRestaurant1Name] = useState();
    const [restaurant2name, setRestaurant2Name] = useState();
    const [restaurant1rating, setRestaurant1Rating] = useState();
    const [restaurant2rating, setRestaurant2Rating] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [restaurantValue, setRestaurantValue] = useState(null);
    const [categoryValue, setCategoryValue] = useState(null);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                let result = await fetch('http://localhost:8000/api/allrestaurants');
                result = await result.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        if (restaurant1name && restaurant2name) {
            handleNextClick();
        }
    }, [restaurant1name, restaurant2name]);

    async function handleCompareClick() {
        setLoading(true);
        setError(false);
        try {
            let item = { category_id, restaurant1_id, restaurant2_id };
            let result = await fetch("http://localhost:8000/api/compareRestaurants", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            result = await result.json();
            setComparisonresult(result);
            // setShowTable(true);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (category_id) {
            handleCompareClick();
        }
    }, [category_id]);

    async function getCategories(restaurant) {
        let restaurant_id = restaurant.value;
        let result = await fetch("http://localhost:8000/api/restaurantCategories?restaurant_id=" + restaurant_id);
        result = await result.json();
        return result;
    }

    async function handleNextClick() {
        setLoading(true);
        setError(false);
        try {
            const categories1 = await getCategories(restaurant1_id);
            const categories2 = await getCategories(restaurant2_id);
            setCategories([...categories1, ...categories2]);
            setShowCategories(true);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }



    function handleSelectChange1(selectedOption) {
        setSelectedOption1(selectedOption);
        setRestaurant1Name(selectedOption.label);
        setRestaurant1Rating(selectedOption.avg_rating)
    }

    function handleSelectChange2(selectedOption) {
        setSelectedOption2(selectedOption);
        setRestaurant2Name(selectedOption.label);
        setRestaurant2Rating(selectedOption.avg_rating)
    }

    function handleCategoriesChange(selectedOption) {
        setSelectedCategory(selectedOption);
    }

    function displayStars(rating) {
        const starIcons = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starIcons.push(<FontAwesomeIcon icon={faStar} key={i} className="text-warning" />);
            } else {
                starIcons.push(<FontAwesomeIcon icon={faStar} key={i} className="text-secondary" />);
            }
        }
        return starIcons;
    }

    useEffect(() => {
        if (comparison_result.length > 0) {
            setShowTable(true);
            console.log(comparison_result);
        }
    }, [comparison_result])

    useEffect(() => {
        if (restaurantValue) {
            setFilteredRestaurant(
                data
                    .map((restaurant) => ({
                        value: restaurant.id,
                        label: restaurant.r_name,
                        avg_rating: restaurant.avg_rating,
                        logo: "http://localhost:8000/" + restaurant.logo,
                    }))
                    .filter((option) =>
                        option.label && restaurantValue
                            ? option.label.toLowerCase().includes(restaurantValue.toLowerCase())
                            : false
                    )
            );
        } else {
            setFilteredRestaurant(
                data.map((restaurant) => ({
                    value: restaurant.id,
                    label: restaurant.r_name,
                    avg_rating: restaurant.avg_rating,
                    logo: "http://localhost:8000/" + restaurant.logo,
                }))
            );
        }
    }, [restaurantValue, data]);
    useEffect(() => {
        if (categoryValue) {
            setFilteredCategory(
                categories
                    .map((category) => ({
                        value: category.id,
                        label: category.name
                    }))
                    .filter((option) =>
                        option.label && categoryValue
                            ? option.label.toLowerCase().includes(categoryValue.toLowerCase())
                            : false
                    )
            );
        } else {
            setFilteredCategory(
                categories.map((category) => ({
                    value: category.id,
                    label: category.name
                }))
            );
        }
    }, [categoryValue, categories]);

    const form = (e) => {
        e.preventDefault();
    }


    return (
        <div className="container-xxl bg-white p-0">
            <Header cmp={'compare'} />
            <div className="container-xxl py-5">
                <div className="container">
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p className="mt-3">Fetching data, please wait...</p>
                        </div>
                    ) : error ? (
                        <div className="text-danger">Error occurred while fetching data.</div>
                    ) : (
                        <form onSubmit={form}>
                            <div className="row g-4">
                                <div className="col-lg-4">
                                    <label htmlFor="restaurant1">Select a restaurant:</label>
                                    <Select
                                        id="restaurant1"
                                        value={restaurant1_id}
                                        onInputChange={(text) => setRestaurantValue(text)}
                                        onChange={handleSelectChange1}
                                        options={filteredRestaurant}
                                        placeholder="Select a restaurant"
                                        isSearchable
                                        getOptionValue={(option) => option.value}
                                        isClearable
                                        isOptionSelected={(option) => option.value === restaurant1_id?.value}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="restaurant2">Select a restaurant:</label>
                                    <Select
                                        id="restaurant2"
                                        value={restaurant2_id}
                                        onInputChange={(text) => setRestaurantValue(text)}
                                        onChange={handleSelectChange2}
                                        options={filteredRestaurant}
                                        placeholder="Select a restaurant"
                                        isSearchable
                                        getOptionValue={(option) => option.value}
                                        isClearable
                                        isOptionSelected={(option) => option.value === restaurant2_id?.value}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="category">Select a category:</label>
                                    <Select
                                        id="category"
                                        value={category_id}
                                        options={filteredCategory}
                                        onInputChange={(text) => setCategoryValue(text)}
                                        placeholder="Select a category"
                                        isSearchable
                                        getOptionValue={(option) => option.value}
                                        getOptionLabel={(option) => option.label}
                                        onChange={handleCategoriesChange}
                                        isClearable
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            {showTable && (
                <div className="container mt-3">
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p className="mt-3">Comparing restaurants, please wait...</p>
                        </div>
                    ) : error ? (
                        <div className="text-danger">Error occurred while fetching comparison data.</div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Dish</th>
                                    <th>{restaurant1name}
                                        <span className='pl-2'>{displayStars(restaurant1rating)}</span>
                                    </th>
                                    <th>{restaurant2name}
                                        <span className='pl-2'>{displayStars(restaurant2rating)}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    comparison_result.length > 0 && (
                                        <>
                                            {comparison_result.map((dish) => (
                                                <React.Fragment key={dish.id}>
                                                    <tr>
                                                        <td>
                                                            <img
                                                                src={"http://localhost:8000/" + dish.image}
                                                                alt={dish.restaurant2_name}
                                                                style={{ width: "80px" }}
                                                                className='p-3'
                                                            />
                                                            {dish.name}
                                                        </td>
                                                        <td>
                                                            {!dish.restaurant1_rating ? (
                                                                <div className="text-start">Not available</div>
                                                            ) : (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm"
                                                                        style={{ backgroundColor: "Orange" }}
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={"#ingredients-" + dish.id}
                                                                        aria-expanded="false"
                                                                        aria-controls={"ingredients-" + dish.id}
                                                                    >
                                                                        View ingredients
                                                                    </button>
                                                                    <div className="mt-2">{displayStars(dish.restaurant1_rating)}</div>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {!dish.restaurant2_rating ? (
                                                                <div className="text-start">Not available</div>
                                                            ) : (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm "
                                                                        style={{ backgroundColor: "Orange" }}
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={"#ingredients-" + dish.id}
                                                                        aria-expanded="false"
                                                                        aria-controls={"ingredients-" + dish.id}
                                                                    >
                                                                        View ingredients
                                                                    </button>
                                                                    <div className="mt-2">{displayStars(dish.restaurant2_rating)}</div>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className="collapse" id={"ingredients-" + dish.id}>
                                                        <td></td>
                                                        <td>
                                                            {dish.restaurant1_rating !== null && (
                                                                <div>
                                                                    <h5>Serving Size</h5>
                                                                    <table className="table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Size</th>
                                                                                <th>Price</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                dish.serving_size1.map((size) => (
                                                                                    <tr>
                                                                                        <td>{size.size}</td>
                                                                                        <td>Rs-{size.price}</td>
                                                                                    </tr>
                                                                                ))
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                    <h5>Ingredients</h5>
                                                                    <ul>
                                                                        {dish.ingredients1.map((ingredient) => (
                                                                            <li key={ingredient.id} className="ingredient-item">
                                                                                <span className="quantity">{ingredient.quantity}</span>
                                                                                <span className="unit">{ingredient.unit}</span>
                                                                                <span className="ingredient-name">{ingredient.ingredient_name}</span>
                                                                            </li>))}
                                                                    </ul>
                                                                    <h5>Nutrients</h5>
                                                                    <table className="table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Nutrient</th>
                                                                                <th>Amount</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Calories</td>
                                                                                <td>{dish.calories1}kcal</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Protein</td>
                                                                                <td>{dish.protein1}g</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Fat</td>
                                                                                <td>{dish.fat1}g</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Carbohydrates</td>
                                                                                <td>{dish.carbs1}g</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Fiber</td>
                                                                                <td>{dish.fiber1}g</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Sugar</td>
                                                                                <td>{dish.sugar1}g</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {dish.restaurant2_rating !== null && (
                                                                <div>
                                                                    <h5>Serving Size</h5>
                                                                    <table className="table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Size</th>
                                                                                <th>Price</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                dish.serving_size2.map((size) => (
                                                                                    <tr>
                                                                                        <td>{size.size}</td>
                                                                                        <td>Rs-{size.price}</td>
                                                                                    </tr>
                                                                                ))
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                    <h5>Ingredients</h5>
                                                                    <ul>
                                                                        {dish.ingredients2.map((ingredient) => (
                                                                            <li key={ingredient.id} className="ingredient-item">
                                                                                <span className="quantity">{ingredient.quantity}</span>
                                                                                <span className="unit">{ingredient.unit}</span>
                                                                                <span className="ingredient-name">{ingredient.ingredient_name}</span>
                                                                            </li>))}
                                                                    </ul>
                                                                    <h5>Nutrients</h5>
                                                                    <table className="table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Nutrient</th>
                                                                                <th>Amount</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Calories</td>
                                                                                <td>{dish.calories2}kcal</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Protein</td>
                                                                                <td>{dish.protein2}g</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Fat</td>
                                                                                <td>{dish.fat2}g</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Carbohydrates</td>
                                                                                <td>{dish.carbs2}g</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Fiber</td>
                                                                                <td>{dish.fiber2}g</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Sugar</td>
                                                                                <td>{dish.sugar2}g</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}

                                        </>
                                    )
                                }

                            </tbody>
                        </table>
                    )}
                </div>
            )}
            <Footer />
        </div>
    );
}


// import React, { useEffect, useState } from 'react';
// import { Button, Spinner } from 'react-bootstrap';
// import Select from 'react-select';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
// import Footer from './components/Footer'
// import Header from './components/Header';

// export default function ComparisonScreen() {
//     const [data, setData] = useState([]);
//     const [restaurant1_id, setSelectedOption1] = useState(null);
//     const [restaurant2_id, setSelectedOption2] = useState(null);
//     const [category_id, setSelectedCategory] = useState(null);
//     const [comparison_result, setComparisonresult] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [showCategories, setShowCategories] = useState(false);
//     const [showTable, setShowTable] = useState(false);
//     const [restaurant1name, setRestaurant1Name] = useState();
//     const [restaurant2name, setRestaurant2Name] = useState();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         async function getData() {
//             try {
//                 let result = await fetch('http://localhost:8000/api/allrestaurants');
//                 result = await result.json();
//                 setData(result);
//                 setLoading(false);
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         }
//         getData();
//     }, []);

//     useEffect(() => {
//         if (restaurant1name && restaurant2name) {
//             handleNextClick();
//         }
//     }, [restaurant1name, restaurant2name]);

//     useEffect(() => {
//         if (category_id) {
//             handleCompareClick();
//         }
//     }, [category_id]);

//     async function getCategories(restaurant) {
//         let restaurant_id = restaurant.value;
//         let result = await fetch("http://localhost:8000/api/restaurantCategories?restaurant_id=" + restaurant_id);
//         result = await result.json();
//         return result;
//     }

//     async function handleNextClick() {
//         setLoading(true);
//         setError(false);
//         try {
//             const categories1 = await getCategories(restaurant1_id);
//             const categories2 = await getCategories(restaurant2_id);
//             setCategories([...categories1, ...categories2]);
//             setShowCategories(true);
//         } catch (error) {
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     }

//     async function handleCompareClick() {
//         setLoading(true);
//         setError(false);
//         try {
//             let item = { category_id, restaurant1_id, restaurant2_id };
//             let result = await fetch("http://localhost:8000/api/compareRestaurants", {
//                 method: 'POST',
//                 body: JSON.stringify(item),
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 }
//             });
//             result = await result.json();
//             setComparisonresult(result);
//             setShowTable(true);
//         } catch (error) {
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     }

//     function handleSelectChange1(selectedOption) {
//         setSelectedOption1(selectedOption);
//         setRestaurant1Name(selectedOption.label);
//     }

//     function handleSelectChange2(selectedOption) {
//         setSelectedOption2(selectedOption);
//         setRestaurant2Name(selectedOption.label);
//     }

//     function handleCategoriesChange(selectedOption) {
//         setSelectedCategory(selectedOption);
//     }

//     function displayStars(rating) {
//         const starIcons = [];

//         for (let i = 1; i <= 5; i++) {
//             if (i <= rating) {
//                 starIcons.push(<FontAwesomeIcon icon={faStar} key={i} className="text-warning" />);
//             } else {
//                 starIcons.push(<FontAwesomeIcon icon={faStar} key={i} className="text-secondary" />);
//             }
//         }
//         return starIcons;
//     }

//     const options = data.map(restaurant => ({
//         value: restaurant.id,
//         label: restaurant.r_name,
//         logo: "http://localhost:8000/" + restaurant.logo
//     }));

//     const categoryOptions = categories.map(category => ({
//         value: category.id,
//         label: category.name
//     }));

//     return (
//         <div className="container-xxl bg-white p-0">
//             <Header cmp={'compare'} />
//             <div className="container-xxl py-5">
//                 <div className="container">
//                     {loading ? (
//                         <Spinner animation="border" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </Spinner>
//                     ) : error ? (
//                         <div className="text-danger">Error occurred while fetching data.</div>
//                     ) : (
//                         <form>
//                             <div className="row g-4">
//                                 <div className="col-lg-4">
//                                     <label htmlFor="restaurant1">Select a restaurant:</label>
//                                     <Select
//                                         id="restaurant1"
//                                         value={restaurant1_id}
//                                         onChange={handleSelectChange1}
//                                         options={options}
//                                         placeholder="Select a restaurant"
//                                         isSearchable
//                                         getOptionLabel={(option) => (
//                                             <div>
//                                                 <img style={{ borderRadius: 2, marginRight: 3 }} src={option.logo} alt={option.label} width="24" height="24" />
//                                                 <span>{option.label}</span>
//                                             </div>
//                                         )}
//                                         getOptionValue={(option) => option.value}
//                                         isClearable
//                                         isOptionSelected={(option) => option.value === restaurant1_id?.value}
//                                     />
//                                 </div>
//                                 <div className="col-lg-4">
//                                     <label htmlFor="restaurant2">Select a restaurant:</label>
//                                     <Select
//                                         id="restaurant2"
//                                         value={restaurant2_id}
//                                         onChange={handleSelectChange2}
//                                         options={options}
//                                         placeholder="Select a restaurant"
//                                         isSearchable
//                                         getOptionLabel={(option) => (
//                                             <div>
//                                                 <img style={{ borderRadius: 2, marginRight: 3 }} src={option.logo} alt={option.label} width="24" height="24" />
//                                                 <span>{option.label}</span>
//                                             </div>
//                                         )}
//                                         getOptionValue={(option) => option.value}
//                                         isClearable
//                                         isOptionSelected={(option) => option.value === restaurant2_id?.value}
//                                     />
//                                 </div>
//                                 <div className="col-lg-4">
//                                     <label htmlFor="category">Select a category:</label>
//                                     <Select
//                                         id="category"
//                                         options={categoryOptions}
//                                         placeholder="Select a category"
//                                         isSearchable
//                                         getOptionValue={(option) => option.value}
//                                         getOptionLabel={(option) => option.label}
//                                         onChange={handleCategoriesChange}
//                                         isClearable
//                                     />
//                                 </div>
//                             </div>
//                         </form>
//                     )}
//                 </div>
//             </div>
//             {showTable && (
//                 <div className="container mt-3">
//                     {loading ? (
//                         <Spinner animation="border" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </Spinner>
//                     ) : error ? (
//                         <div className="text-danger">Error occurred while fetching comparison data.</div>
//                     ) : (
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>Dish</th>
//                                     <th>{restaurant1name}</th>
//                                     <th>{restaurant2name}</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {comparison_result.map((dish) => (
//                                     <React.Fragment key={dish.id}>
//                                         <tr>
//                                             <td>
//                                                 <img
//                                                     src={"http://localhost:8000/" + dish.image}
//                                                     alt={dish.restaurant2_name}
//                                                     style={{ width: "80px" }}
//                                                 />
//                                                 {dish.name}
//                                             </td>
//                                             <td>
//                                                 {dish.restaurant1_rating ? (
//                                                     <div>
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-sm btn-primary"
//                                                             data-bs-toggle="collapse"
//                                                             data-bs-target={"#ingredients-" + dish.id}
//                                                             aria-expanded="false"
//                                                             aria-controls={"ingredients-" + dish.id}
//                                                         >
//                                                             View ingredients
//                                                         </button>
//                                                         <div className="mt-2">{displayStars(dish.restaurant1_rating)}</div>
//                                                     </div>
//                                                 ) : (
//                                                     <div className="text-start">Not available</div>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 {dish.restaurant2_rating ? (
//                                                     <div>
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-primary btn-sm "
//                                                             data-bs-toggle="collapse"
//                                                             data-bs-target={"#ingredients-" + dish.id}
//                                                             aria-expanded="false"
//                                                             aria-controls={"ingredients-" + dish.id}
//                                                         >
//                                                             View ingredients
//                                                         </button>
//                                                         <div className="mt-2">{displayStars(dish.restaurant2_rating)}</div>
//                                                     </div>
//                                                 ) : (
//                                                     <div className="text-start">Not available</div>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                         <tr className="collapse" id={"ingredients-" + dish.id}>
//                                             <td></td>
//                                             <td>
//                                                 {dish.restaurant1_rating && (
//                                                     <div>
//                                                         <h5>Ingredients</h5>
//                                                         <ul>
//                                                             {dish.ingredients.map((ingredient) => (
//                                                                 <li key={ingredient.id}>{ingredient.ingredient_name}</li>
//                                                             ))}
//                                                         </ul>
//                                                         <h5>Nutrients</h5>
//                                                         <table className="table table-striped">
//                                                             <thead>
//                                                                 <tr>
//                                                                     <th>Nutrient</th>
//                                                                     <th>Amount</th>
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 <tr>
//                                                                     <td>Calories</td>
//                                                                     <td>{dish.calories1}kcal</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Protein</td>
//                                                                     <td>{dish.protein1}g</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Fat</td>
//                                                                     <td>{dish.fat1}g</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Carbohydrates</td>
//                                                                     <td>{dish.carbs1}g</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Fiber</td>
//                                                                     <td>{dish.fiber1}g</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Sugar</td>
//                                                                     <td>{dish.sugar1}g</td>
//                                                                 </tr>
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 {dish.restaurant2_rating && (
//                                                     <div>
//                                                         <h5>Ingredients</h5>
//                                                         <ul>
//                                                             {dish.ingredients.map((ingredient) => (
//                                                                 <li key={ingredient}>{ingredient.ingredient_name}</li>
//                                                             ))}
//                                                         </ul>
//                                                         <h5>Nutrients</h5>
//                                                         <table className="table table-striped">
//                                                             <thead>
//                                                                 <tr>
//                                                                     <th>Nutrient</th>
//                                                                     <th>Amount</th>
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 <tr>
//                                                                     <td>Calories</td>
//                                                                     <td>{dish.calories2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Protein</td>
//                                                                     <td>{dish.protein2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Fat</td>
//                                                                     <td>{dish.fat2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Carbohydrates</td>
//                                                                     <td>{dish.carbs2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Fiber</td>
//                                                                     <td>{dish.fiber2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Sugar</td>
//                                                                     <td>{dish.sugar2}</td>
//                                                                 </tr>
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     </React.Fragment>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             )}
//             <Footer />
//         </div>
//     );
// }



// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import Select from 'react-select';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
// import Footer from './components/Footer'

// export default function ComparisonScreen() {
//     const [data, setData] = useState([]);
//     const [restaurant1_id, setSelectedOption1] = useState(null);
//     const [restaurant2_id, setSelectedOption2] = useState(null);
//     const [category_id, setSelectedCategory] = useState(null);
//     const [comparison_result, setComparisonresult] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [showCategories, setShowCategories] = useState(false);
//     const [showTable, setshowTable] = useState(false);
//     const [restaurant1name, setRestaurant1Name] = useState();
//     const [restaurant2name, setRestaurant2Name] = useState();
//     useEffect(() => {
//         async function getData() {
//             let result = await fetch('http://localhost:8000/api/allrestaurants');
//             result = await result.json();
//             setData(result);
//         }
//         getData();
//     }, []);

//     useEffect(() => {
//         if (restaurant1name && restaurant2name) {
//             handleNextClick();
//         }
//     }, [restaurant1name, restaurant2name])
//     useEffect(() => {
//         if (category_id) {
//             handleCompareClick();
//         }
//     }, [category_id])

//     async function getCategories(restaurant) {
//         let restaurant_id = restaurant.value;
//         let result = await fetch("http://localhost:8000/api/restaurantCategories?restaurant_id=" + restaurant_id);
//         result = await result.json();
//         return result;
//     }

//     async function handleNextClick() {
//         const categories1 = await getCategories(restaurant1_id);
//         const categories2 = await getCategories(restaurant2_id);
//         setCategories([...categories1, ...categories2]);
//         setShowCategories(true);
//     }
//     async function handleCompareClick() {
//         let item = { category_id, restaurant1_id, restaurant2_id }
//         let result = await fetch("http://localhost:8000/api/compareRestaurants", {
//             method: 'POST',
//             body: JSON.stringify(item),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         })
//         result = await result.json();
//         console.warn(result);
//         setComparisonresult(result);
//         setshowTable(true);
//     }

//     function handleSelectChange1(selectedOption) {
//         setSelectedOption1(selectedOption);
//         setRestaurant1Name(selectedOption.label);
//     }
//     function handleSelectChange2(selectedOption) {
//         setSelectedOption2(selectedOption);
//         setRestaurant2Name(selectedOption.label);
//     }

//     function handleCategoriesChange(selectedOption) {
//         setSelectedCategory(selectedOption)
//     }


//     const options = data.map(restaurant => ({
//         value: restaurant.id,
//         label: restaurant.r_name,
//         logo: "http://localhost:8000/" + restaurant.logo
//     }));

//     function displayStars(rating) {
//         const starIcons = [];

//         for (let i = 1; i <= 5; i++) {
//             if (i <= rating) {
//                 starIcons.push(<FontAwesomeIcon icon={faStar} key={i} className="text-warning" />);
//             } else {
//                 starIcons.push(<FontAwesomeIcon icon={faStar} key={i} className="text-secondary" />);
//             }
//         }
//         return starIcons;
//     }

//     const categoryOptions = categories.map(category => ({
//         value: category.id,
//         label: category.name
//     }));
//     return (
//         <div className="container-xxl bg-white p-0">
//             <div className="container-xxl py-5">
//                 <div className="container">
//                     <form>
//                         <div className="row g-4">
//                             <div className="col-lg-4">
//                                 <label htmlFor="restaurant1">Select a restaurant:</label>
//                                 <Select
//                                     id="restaurant1"
//                                     value={restaurant1_id}
//                                     onChange={handleSelectChange1}
//                                     options={options}
//                                     placeholder="Select a restaurant"
//                                     isSearchable
//                                     getOptionLabel={(option) => (
//                                         <div>
//                                             <img style={{ borderRadius: 2, marginRight: 3 }} src={option.logo} alt={option.label} width="24" height="24" />
//                                             <span>{option.label}</span>
//                                         </div>
//                                     )}
//                                     getOptionValue={(option) => option.value}
//                                     isClearable
//                                     isOptionSelected={(option) => option.value === restaurant1_id?.value}
//                                 />
//                             </div>
//                             <div className="col-lg-4">
//                                 <label htmlFor="restaurant2">Select a restaurant:</label>
//                                 <Select
//                                     id="restaurant2"
//                                     value={restaurant2_id}
//                                     onChange={handleSelectChange2}
//                                     options={options}
//                                     placeholder="Select a restaurant"
//                                     isSearchable
//                                     getOptionLabel={(option) => (
//                                         <div>
//                                             <img style={{ borderRadius: 2, marginRight: 3 }} src={option.logo} alt={option.label} width="24" height="24" />
//                                             <span>{option.label}</span>
//                                         </div>
//                                     )}
//                                     getOptionValue={(option) => option.value}
//                                     isClearable
//                                     isOptionSelected={(option) => option.value === restaurant2_id?.value}
//                                 />
//                             </div>
//                             <div className="col-lg-4">
//                                 <label htmlFor="category">Select a category:</label>
//                                 <Select
//                                     id="category"
//                                     options={categoryOptions}
//                                     placeholder="Select a category"
//                                     isSearchable
//                                     getOptionValue={(option) => option.value}
//                                     getOptionLabel={(option) => option.label}
//                                     onChange={handleCategoriesChange}
//                                     isClearable
//                                 />
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             {
//                 showTable && (
//                     <div className="container mt-3">
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>Dish</th>
//                                     <th>{restaurant1name}</th>
//                                     <th>{restaurant2name}</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {comparison_result.map((dish) => (
//                                     <React.Fragment key={dish.id}>
//                                         <tr>
//                                             <td>
//                                                 <img
//                                                     src={"http://localhost:8000/" + dish.image}
//                                                     alt={dish.restaurant2_name}
//                                                     style={{ width: "80px" }}
//                                                 />
//                                                 {dish.name}
//                                             </td>
//                                             <td>
//                                                 {dish.restaurant1_rating ? (
//                                                     <div>
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-sm btn-primary"
//                                                             data-bs-toggle="collapse"
//                                                             data-bs-target={"#ingredients-" + dish.id}
//                                                             aria-expanded="false"
//                                                             aria-controls={"ingredients-" + dish.id}
//                                                         >
//                                                             View ingredients
//                                                         </button>
//                                                         <div className="mt-2">{displayStars(dish.restaurant1_rating)}</div>
//                                                     </div>
//                                                 ) : (
//                                                     <div className="text-start">Not available</div>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 {dish.restaurant2_rating ? (
//                                                     <div>
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-primary btn-sm "
//                                                             data-bs-toggle="collapse"
//                                                             data-bs-target={"#ingredients-" + dish.id}
//                                                             aria-expanded="false"
//                                                             aria-controls={"ingredients-" + dish.id}
//                                                         >
//                                                             View ingredients
//                                                         </button>
//                                                         <div className="mt-2">{displayStars(dish.restaurant2_rating)}</div>
//                                                     </div>
//                                                 ) : (
//                                                     <div className="text-start">Not available</div>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                         <tr className="collapse" id={"ingredients-" + dish.id}>
//                                             <td></td>
//                                             <td>
//                                                 {dish.restaurant1_rating && (
//                                                     <div>
//                                                         <h5>Ingredients</h5>
//                                                         <ul>
//                                                             {dish.ingredients.map((ingredient) => (
//                                                                 <li key={ingredient.id}>{ingredient.ingredient_name}</li>
//                                                             ))}
//                                                         </ul>
//                                                         <h5>Nutrients</h5>
//                                                         <table className="table table-striped">
//                                                             <thead>
//                                                                 <tr>
//                                                                     <th>Nutrient</th>
//                                                                     <th>Amount</th>
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 <tr>
//                                                                     <td>Calories</td>
//                                                                     <td>{dish.calories1}kcal</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Protein</td>
//                                                                     <td>{dish.protein1}g</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Fat</td>
//                                                                     <td>{dish.fat1}g</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Carbohydrates</td>
//                                                                     <td>{dish.carbs1}g</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>fiber</td>
//                                                                     <td>{dish.fiber1}g</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>sugar</td>
//                                                                     <td>{dish.sugar1}g</td>
//                                                                 </tr>
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 {dish.restaurant2_rating && (
//                                                     <div>
//                                                         <h5>Ingredients</h5>
//                                                         <ul>
//                                                             {dish.ingredients.map((ingredient) => (
//                                                                 <li key={ingredient}>{ingredient.ingredient_name}</li>
//                                                             ))}
//                                                         </ul>
//                                                         <h5>Nutrients</h5>
//                                                         <table className="table table-striped">
//                                                             <thead>
//                                                                 <tr>
//                                                                     <th>Nutrient</th>
//                                                                     <th>Amount</th>
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 <tr>
//                                                                     <td>Calories</td>
//                                                                     <td>{dish.calories2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Protein</td>
//                                                                     <td>{dish.protein2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Fat</td>
//                                                                     <td>{dish.fat2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>Carbohydrates</td>
//                                                                     <td>{dish.carbs2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>fiber</td>
//                                                                     <td>{dish.fiber2}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td>sugar</td>
//                                                                     <td>{dish.sugar2}</td>
//                                                                 </tr>
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     </React.Fragment>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )
//             }
//             <Footer />
//         </div>
//     )
// }
