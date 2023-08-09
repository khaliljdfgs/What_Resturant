import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Comparison() {
    const [data, setData] = useState([]);
    const [restaurant1_id, setSelectedOption1] = useState(null);
    const [restaurant2_id, setSelectedOption2] = useState(null);
    const [category1_id, setSelectedCategory1] = useState(null);
    const [category2_id, setSelectedCategory2] = useState(null);
    const [comparison_result, setComparisonresult] = useState([]);
    const [categories1, setCategories1] = useState([]);
    const [categories2, setCategories2] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [showTable, setshowTable] = useState(false);
    const [restaurant1name, setRestaurant1Name] = useState();
    const [restaurant2name, setRestaurant2Name] = useState();
    useEffect(() => {
        async function getData() {
            let result = await fetch('http://localhost:8000/api/allrestaurants');
            result = await result.json();
            setData(result);
        }
        getData();
    }, []);

    async function getCategories(restaurant) {
        let restaurant_id = restaurant.value;
        let result = await fetch("http://localhost:8000/api/restaurantCategories?restaurant_id=" + restaurant_id);
        result = await result.json();
        return result;
    }

    async function handleNextClick() {
        const categories1 = await getCategories(restaurant1_id);
        const categories2 = await getCategories(restaurant2_id);
        setCategories1(categories1);
        setCategories2(categories2);
        setShowCategories(true);
    }
    async function handleCompareClick() {
        let item = { category1_id, category2_id, restaurant1_id, restaurant2_id }
        let result = await fetch("http://localhost:8000/api/compareRestaurants", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        result = await result.json();
        // console.warn(result);
        setComparisonresult(result);
        setshowTable(true);
    }

    function handleSelectChange1(selectedOption) {
        setSelectedOption1(selectedOption);
        setRestaurant1Name(selectedOption.label);
        // alert(selectedOption);
    }
    function handleSelectChange2(selectedOption) {
        setSelectedOption2(selectedOption);
        setRestaurant2Name(selectedOption.label);
    }

    function handleCategoriesChange1(selectedOption) {
        setSelectedCategory1(selectedOption)
    }
    function handleCategoriesChange2(selectedOption) {
        setSelectedCategory2(selectedOption)
    }

    const options = data.map(restaurant => ({
        value: restaurant.id,
        label: restaurant.r_name
    }));

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

    const category1Options = categories1.map(category => ({
        value: category.id,
        label: category.name
    }));
    const category2Options = categories2.map(category => ({
        value: category.id,
        label: category.name
    }));

    return (
        <div>
            <div className="container-xxl py-5">
                <div className="container">
                    <form>
                        <div className="row g-4">
                            <div className='col-lg-5'>
                                <Select
                                    value={restaurant1_id}
                                    onChange={handleSelectChange1}
                                    options={options}
                                    placeholder="Restaurant 1"
                                />
                            </div>
                            <div className='col-lg-5'>
                                <Select
                                    value={restaurant2_id}
                                    onChange={handleSelectChange2}
                                    options={options}
                                    placeholder="Restaurant 2"
                                />
                            </div>
                            <div className='col-lg-2'>
                                <Button className="btn btn-primary px-5" onClick={handleNextClick}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                {
                    showCategories && (
                        <div className="container  mt-3">
                            <form>
                                <div className="row g-4">
                                    <div className='col-lg-5'>
                                        <Select
                                            value={category1_id}
                                            onChange={handleCategoriesChange1}
                                            options={category1Options}
                                            placeholder="Category 1"
                                        />
                                    </div>
                                    <div className='col-lg-5'>
                                        <Select
                                            value={category2_id}
                                            onChange={handleCategoriesChange2}
                                            options={category2Options}
                                            placeholder="Category 2"
                                        />
                                    </div>
                                    <div className='col-lg-2'>
                                        <Button className="btn btn-primary px-5" onClick={handleCompareClick}>
                                            Compare
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }
            </div>
            {
                showTable && (
                    <div className="container mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Dish</th>
                                    <th>{restaurant1name}</th>
                                    <th>{restaurant2name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison_result.map((dish) => (
                                    <React.Fragment key={dish.id}>
                                        <tr>
                                            <td>
                                                <img
                                                    src={"http://localhost:8000/" + dish.image}
                                                    alt={dish.restaurant2_name}
                                                    style={{ width: "80px" }}
                                                />
                                                {dish.name}
                                            </td>
                                            <td>
                                                {dish.restaurant1_rating ? (
                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target={"#ingredients-" + dish.id}
                                                            aria-expanded="false"
                                                            aria-controls={"ingredients-" + dish.id}
                                                            class='btn btn-sm btn-primary'
                                                        >
                                                            View ingredients
                                                        </button>
                                                        <div className="mt-2">{displayStars(dish.restaurant1_rating)}</div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center">Not available</div>
                                                )}
                                            </td>
                                            <td>
                                                {dish.restaurant2_rating ? (
                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target={"#ingredients-" + dish.id}
                                                            aria-expanded="false"
                                                            aria-controls={"ingredients-" + dish.id}
                                                        >
                                                            View ingredients
                                                        </button>
                                                        <div className="mt-2">{displayStars(dish.restaurant2_rating)}</div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center">Not available</div>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className="collapse" id={"ingredients-" + dish.id}>
                                            <td></td>
                                            <td>
                                                {dish.restaurant1_rating && (
                                                    <div>
                                                        <h5>Ingredients</h5>
                                                        <ul>
                                                            {dish.ingredients.map((ingredient) => (
                                                                <li key={ingredient.id}>{ingredient.ingredient_name}</li>
                                                            ))}
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
                                                                    <td>{dish.calories}kcal</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Protein</td>
                                                                    <td>{dish.protein}g</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Fat</td>
                                                                    <td>{dish.fat}g</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Carbohydrates</td>
                                                                    <td>{dish.carbs}g</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>fiber</td>
                                                                    <td>{dish.fiber}g</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>sugar</td>
                                                                    <td>{dish.sugar}g</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                {dish.restaurant2_rating && (
                                                    <div>
                                                        <h5>Ingredients</h5>
                                                        <ul>
                                                            {dish.ingredients.map((ingredient) => (
                                                                <li key={ingredient}>{ingredient.ingredient_name}</li>
                                                            ))}
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
                                                                    <td>{dish.calories}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Protein</td>
                                                                    <td>{dish.protein}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Fat</td>
                                                                    <td>{dish.fat}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Carbohydrates</td>
                                                                    <td>{dish.carbs}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>fiber</td>
                                                                    <td>{dish.fiber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>sugar</td>
                                                                    <td>{dish.sugar}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
            {/* {
                showTable && (
                    <div class="table-responsive container mt-3">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Dish</th>
                                    <th>{restaurant1name}</th>
                                    <th>{restaurant2name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison_result.map((dish) => (
                                    <tr key={dish.id}>
                                        <td>
                                            <img src={'http://localhost:8000/' + dish.image} alt={dish.restaurant2_name} style={{ width: '80px' }} />
                                            {dish.name}
                                        </td>
                                        <td>
                                            {dish.restaurant1_rating ? (
                                                <div>
                                                    <div className="mt-2">
                                                        <p>Ingredients: {dish.ingredients}</p>
                                                        <p>Calories:{dish.calories}</p>
                                                        <p>protein:{dish.protein}</p>
                                                        <p>fat:{dish.fat}</p>
                                                        <p>carbs:{dish.carbs}</p>
                                                        <p>fiber:{dish.fiber}</p>
                                                        <p>sugar:{dish.sugar}</p>
                                                        {displayStars(dish.restaurant2_rating)}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center">Not available</div>
                                            )}
                                        </td>
                                        <td>
                                            {dish.restaurant2_rating ? (
                                                <div>
                                                    <div className="mt-2">
                                                        <p>Ingredients: {dish.ingredients}</p>
                                                        <p>Calories:{dish.calories}</p>
                                                        <p>Calories:{dish.calories}</p>
                                                        <p>Calories:{dish.calories}</p>
                                                        <p>Calories:{dish.calories}</p>
                                                        <p>Calories:{dish.calories}</p>
                                                        {displayStars(dish.restaurant2_rating)}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>Not available dghjshjhsdjhhdjskjksjdkjdkjdkjdkjkdkdjksjkjskdjksdjksjdksjdkjsdkjsdkjsdkjdskjdkjsdkjskdjkdj</div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )
            } */}
        </div>
    );

    //  return (
    //      <div className='container-xxl bg-white p-0'>
    //          <div className="container-xxl py-5">
    //              <div className="container">
    //                  <form>
    //                      <div className="row g-4">
    //                       <div className='col-lg-5'>
    //                        <Select
    //                                 value={restaurant1_id}
    //                                 onChange={handleSelectChange1}
    //                                 options={options}
    //                                 placeholder="Restaurant 1"
    //                             />
    //                         </div>
    //                         <div className='col-lg-5'>
    //                             <Select
    //                                 value={restaurant2_id}
    //                                 onChange={handleSelectChange2}
    //                                 options={options}
    //                                 placeholder="Restaurant 2"
    //                             />
    //                         </div>
    //                         <div className='col-lg-2'>
    //                             <Button className="btn btn-primary px-5" onClick={handleNextClick}>
    //                                 Next
    //                             </Button>
    //                         </div>
    //                     </div>
    //                 </form>
    //             </div>
    //             {
    //                 showCategories && (
    //                     <div className="container  mt-3">
    //                         <form>
    //                             <div className="row g-4">
    //                                 <div className='col-lg-5'>
    //                                     <Select
    //                                         value={category1_id}
    //                                         onChange={handleCategoriesChange1}
    //                                         options={category1Options}
    //                                         placeholder="Category 1"
    //                                     />
    //                                 </div>
    //                                 <div className='col-lg-5'>
    //                                     <Select
    //                                         value={category2_id}
    //                                         onChange={handleCategoriesChange2}
    //                                         options={category2Options}
    //                                         placeholder="Category 2"
    //                                     />
    //                                 </div>
    //                                 <div className='col-lg-2'>
    //                                     <Button className="btn btn-primary px-5" onClick={handleCompareClick}>
    //                                         Compare
    //                                     </Button>
    //                                 </div>
    //                             </div>
    //                         </form>
    //                     </div>
    //                 )
    //             }
    //             <div className="container mt-3">
    //                 <div className='row g-4'>
    //                     <div className='col-lg-5'>
    //                         {comparison_result.map(dish => (
    //                             <div key={dish.id}>
    //                                 {
    //                                     dish.restaurant1_rating == null ?
    //                                         <>
    //                                             <div className="text-center">
    //                                                 <h1>Not have that Dish</h1>
    //                                             </div>
    //                                         </>
    //                                         :
    //                                         <>
    //                                             <div className="d-flex align-items-center">
    //                                                 <img className="flex-shrink-0 img-fluid rounded" src={'http://localhost:8000/' + dish.image} alt style={{ width: 80 }} />
    //                                                 <div className="w-100 d-flex flex-column text-start ps-4">
    //                                                     <h5 className="d-flex justify-content-between border-bottom pb-2">
    //                                                         <span>{dish.name}</span>
    //                                                         <span className="text-primary">{dish.price}</span>
    //                                                     </h5>
    //                                                     <small className="fst-italic">{displayStars(dish.restaurant1_rating)}</small>
    //                                                 </div>
    //                                             </div>
    //                                         </>
    //                                 }
    //                             </div>
    //                         ))}
    //                     </div>
    //                     <div className='col-lg-5'>
    //                         {comparison_result.map(dish => (
    //                             <div key={dish.id}>
    //                                 {
    //                                     dish.restaurant2_rating == null ?
    //                                         <>
    //                                             <div className="text-center">
    //                                                 <h1>Not have that Dish</h1>
    //                                             </div>
    //                                         </>
    //                                         :
    //                                         <>
    //                                             <div className="d-flex align-items-center">
    //                                                 <img className="flex-shrink-0 img-fluid rounded" src={'http://localhost:8000/' + dish.image} alt style={{ width: 80 }} />
    //                                                 <div className="w-100 d-flex flex-column text-start ps-4">
    //                                                     <h5 className="d-flex justify-content-between border-bottom pb-2">
    //                                                         <span>{dish.name}</span>
    //                                                         <span className="text-primary">{dish.price}</span>
    //                                                     </h5>
    //                                                     <small className="fst-italic">{displayStars(dish.restaurant2_rating)}</small>
    //                                                 </div>
    //                                             </div>
    //                                         </>
    //                                 }
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </div>
    //             </div>

    //         </div>
    //     </div>
    // );
}
