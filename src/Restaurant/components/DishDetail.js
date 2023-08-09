import React, { useEffect, useState } from 'react';

export default function DishDetail(props) {
    const [dish, setDish] = useState(props.dish);
    const [ingredients, setIngredients] = useState([]);
    const [nutritionValues, setNutritionValues] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const ingredientsResponse = await fetch(
                    `http://localhost:8000/api/DishIngredients?dishId=${dish.id}`
                );
                const ingredientsData = await ingredientsResponse.json();
                setIngredients(ingredientsData);

                const nutritionResponse = await fetch(
                    `http://localhost:8000/api/DishNutrients?dishId=${dish.id}`
                );
                const nutritionData = await nutritionResponse.json();
                setNutritionValues(nutritionData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (dish) {
            fetchData();
        }
    }, [dish]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDish((prevDish) => ({
            ...prevDish,
            [name]: value,
        }));
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        setIngredients((prevIngredients) => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients[index][name] = value;
            return updatedIngredients;
        });
    };

    const handleNutritionChange = (index, e) => {
        const { name, value } = e.target;
        setNutritionValues((prevNutritionValues) => {
            const updatedNutritionValues = [...prevNutritionValues];
            updatedNutritionValues[index][name] = value;
            return updatedNutritionValues;
        });
    };

    const handleEditClick = (value) => {
        setEditMode(true);
        setEditValue(value);
    };

    const handleSaveClick = () => {
        setEditMode(false);
        const dishData = [dish];

        // Prepare the data to send to the backend
        const data = {
            dish: dishData,
            ingredients: ingredients,
            nutritionValues: nutritionValues
        };

        // Make an HTTP POST request to the backend API endpoint
        fetch('http://localhost:8000/api/EditDish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data here
                console.log(data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
    };
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Restaurant Requests</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header border-transparent">
                                <h3 className="card-title">Dish Detail</h3>
                                <div className="card-tools">
                                    <button
                                        type="button"
                                        className="btn btn-tool"
                                        data-card-widget="collapse"
                                    >
                                        <i className="fas fa-minus" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-tool"
                                        data-card-widget="remove"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="profile">
                                    <img
                                        src={`http://localhost:8000/${dish.image}`}
                                        alt="Dish"
                                        className="profile-image"
                                    />
                                    <div className="profile-details">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Item ID:</th>
                                                    <td>
                                                        {editMode ? (
                                                            <input
                                                                type="text"
                                                                name="id"
                                                                value={dish.id}
                                                                onChange={handleInputChange}
                                                                className="edit-input"
                                                            />
                                                        ) : (
                                                            dish.id
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Name:</th>
                                                    <td>
                                                        {editMode ? (
                                                            <input
                                                                type="text"
                                                                name="item_name"
                                                                value={dish.item_name}
                                                                onChange={handleInputChange}
                                                                className="edit-input"
                                                            />
                                                        ) : (
                                                            dish.item_name
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Price:</th>
                                                    <td>
                                                        {editMode ? (
                                                            <input
                                                                type="text"
                                                                name="item_price"
                                                                value={dish.item_price}
                                                                onChange={handleInputChange}
                                                                className="edit-input"
                                                            />
                                                        ) : (
                                                            dish.item_price
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Description:</th>
                                                    <td>
                                                        {editMode ? (
                                                            <input
                                                                type="text"
                                                                name="item_description"
                                                                value={dish.item_description}
                                                                onChange={handleInputChange}
                                                                className="edit-input"
                                                            />
                                                        ) : (
                                                            dish.item_description
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Ingredients:</th>
                                                    <td>
                                                        <ul className="ingredient-list">
                                                            {ingredients.map((ingredient, index) => (
                                                                <li key={ingredient.id}>
                                                                    {editMode ? (
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                name="ingredient_name"
                                                                                value={ingredient.ingredient_name}
                                                                                onChange={(e) =>
                                                                                    handleIngredientChange(index, e)
                                                                                }
                                                                                className="edit-input"
                                                                            />
                                                                            <input
                                                                                type="text"
                                                                                name="quantity"
                                                                                value={ingredient.quantity}
                                                                                onChange={(e) =>
                                                                                    handleIngredientChange(index, e)
                                                                                }
                                                                                className="edit-input"
                                                                            />
                                                                            <input
                                                                                type="text"
                                                                                name="unit"
                                                                                value={ingredient.unit}
                                                                                onChange={(e) =>
                                                                                    handleIngredientChange(index, e)
                                                                                }
                                                                                className="edit-input"
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            {ingredient.ingredient_name} (
                                                                            {ingredient.quantity} {ingredient.unit})
                                                                        </>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Nutrition Values:</th>
                                                    <td>
                                                        <ul className="nutrition-list">
                                                            {nutritionValues.map((nutrition, index) => (
                                                                <li key={nutrition.id}>
                                                                    {editMode ? (
                                                                        <div>
                                                                            <label htmlFor={`calories-${index}`}>Calories:</label>
                                                                            <input
                                                                                type="text"
                                                                                id={`calories-${index}`}
                                                                                name="calories"
                                                                                value={nutrition.calories}
                                                                                onChange={(e) =>
                                                                                    handleNutritionChange(index, e)
                                                                                }
                                                                                className="edit-input"
                                                                            />
                                                                            <label htmlFor={`protein-${index}`}>Protein:</label>
                                                                            <input
                                                                                type="text"
                                                                                id={`protein-${index}`}
                                                                                name="protein"
                                                                                value={nutrition.protein}
                                                                                onChange={(e) =>
                                                                                    handleNutritionChange(index, e)
                                                                                }
                                                                                className="edit-input"
                                                                            />
                                                                            <label htmlFor={`sugar-${index}`}>Sugar:</label>
                                                                            <input
                                                                                type="text"
                                                                                id={`sugar-${index}`}
                                                                                name="sugar"
                                                                                value={nutrition.sugar}
                                                                                onChange={(e) =>
                                                                                    handleNutritionChange(index, e)
                                                                                }
                                                                                className="edit-input"
                                                                            />
                                                                            <label htmlFor={`carbs-${index}`}>Carbs:</label>
                                                                            <input
                                                                                type="text"
                                                                                id={`carbs-${index}`}
                                                                                name="carbs"
                                                                                value={nutrition.carbs}
                                                                                onChange={(e) =>
                                                                                    handleNutritionChange(index, e)
                                                                                }
                                                                                className="edit-input"
                                                                            />
                                                                            <label htmlFor={`fiber-${index}`}>Fiber:</label>
                                                                            <input
                                                                                type="text"
                                                                                id={`fiber-${index}`}
                                                                                name="fiber"
                                                                                value={nutrition.fiber}
                                                                                onChange={(e) =>
                                                                                    handleNutritionChange(index, e)
                                                                                }
                                                                                className="edit-input"
                                                                            />
                                                                            <label htmlFor={`fat-${index}`}>Fat:</label>
                                                                            <input
                                                                                type="text"
                                                                                id={`fat-${index}`}
                                                                                name="fat"
                                                                                value={nutrition.fat}
                                                                                onChange={(e) =>
                                                                                    handleNutritionChange(index, e)
                                                                                }
                                                                                className="edit-input"
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <strong>Calories:</strong> {nutrition.calories}
                                                                            <br />
                                                                            <strong>Protein:</strong> {nutrition.protein}
                                                                            <br />
                                                                            <strong>Sugar:</strong> {nutrition.sugar}
                                                                            <br />
                                                                            <strong>Carbs:</strong> {nutrition.carbs}
                                                                            <br />
                                                                            <strong>Fiber:</strong> {nutrition.fiber}
                                                                            <br />
                                                                            <strong>Fat:</strong> {nutrition.fat}
                                                                            <br />
                                                                        </>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {editMode ? (
                                            <button onClick={handleSaveClick} className="btn btn-primary">Save</button>
                                        ) : (
                                            <button onClick={handleEditClick} className="btn btn-secondary">Edit</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}




// import React, { useEffect, useState } from 'react';

// export default function DishDetail(props) {
//     const [dish, setDish] = useState(props.dish);
//     const [ingredients, setIngredients] = useState([]);
//     const [nutritionValues, setNutritionValues] = useState([]);
//     const [editMode, setEditMode] = useState(false);
//     const [editValue, setEditValue] = useState('');

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const ingredientsResponse = await fetch(
    //                 `http://localhost:8000/api/DishIngredients?dishId=${dish.id}`
    //             );
    //             const ingredientsData = await ingredientsResponse.json();
    //             setIngredients(ingredientsData);

    //             const nutritionResponse = await fetch(
    //                 `http://localhost:8000/api/DishNutrients?dishId=${dish.id}`
    //             );
    //             const nutritionData = await nutritionResponse.json();
    //             setNutritionValues(nutritionData);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }

    //     if (dish) {
    //         fetchData();
    //     }
    // }, [dish]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setDish((prevDish) => ({
    //         ...prevDish,
    //         [name]: value,
    //     }));
    // };

    // const handleIngredientChange = (index, e) => {
    //     const { name, value } = e.target;
    //     setIngredients((prevIngredients) => {
    //         const updatedIngredients = [...prevIngredients];
    //         updatedIngredients[index][name] = value;
    //         return updatedIngredients;
    //     });
    // };

    // const handleNutritionChange = (index, e) => {
    //     const { name, value } = e.target;
    //     setNutritionValues((prevNutritionValues) => {
    //         const updatedNutritionValues = [...prevNutritionValues];
    //         updatedNutritionValues[index][name] = value;
    //         return updatedNutritionValues;
    //     });
    // };

    // const handleEditClick = (value) => {
    //     setEditMode(true);
    //     setEditValue(value);
    // };

    // const handleSaveClick = () => {
    //     setEditMode(false);
    //     console.log(dish);
    //     console.log(ingredients);
    //     console.log(nutritionValues);
    // };

//     return (
//         <div className="content-wrapper">
//             <section className="content-header">
                // <div className="container-fluid">
                //     <div className="row mb-2">
                //         <div className="col-sm-6">
                //             <h1>Dashboard</h1>
                //         </div>
                //         <div className="col-sm-6">
                //             <ol className="breadcrumb float-sm-right">
                //                 <li className="breadcrumb-item">
                //                     <a href="#">Home</a>
                //                 </li>
                //                 <li className="breadcrumb-item active">Restaurant Requests</li>
                //             </ol>
                //         </div>
                //     </div>
//                 </div>            </section>
//             <section className="content">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="card">
//                             <div className="card-header border-transparent">
                                // <h3 className="card-title">Dish Detail</h3>
                                // <div className="card-tools">
                                //     <button
                                //         type="button"
                                //         className="btn btn-tool"
                                //         data-card-widget="collapse"
                                //     >
                                //         <i className="fas fa-minus" />
                                //     </button>
                                //     <button
                                //         type="button"
                                //         className="btn btn-tool"
                                //         data-card-widget="remove"
                                //     >
                                //         <i className="fas fa-times" />
                                //     </button>
                                // </div>                            </div>
//                             <div className="card-body">
//                                 <div className="profile">
//                                     <img
//                                         src={`http://localhost:8000/${dish.image}`}
//                                         alt="Dish"
//                                         className="profile-image"
//                                     />
//                                     <div className="profile-details">
//                                         <div className="profile-row">
//                                             <div className="profile-label">Item ID:</div>
//                                             <div className="profile-value">
//                                                 {editMode ? (
//                                                     <input
//                                                         type="text"
//                                                         name="id"
//                                                         value={dish.id}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                 ) : (
//                                                     dish.id
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Name:</div>
//                                             <div className="profile-value">
//                                                 {editMode ? (
//                                                     <input
//                                                         type="text"
//                                                         name="item_name"
//                                                         value={dish.item_name}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                 ) : (
//                                                     dish.item_name
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Price:</div>
//                                             <div className="profile-value">
//                                                 {editMode ? (
//                                                     <input
//                                                         type="text"
//                                                         name="item_price"
//                                                         value={dish.item_price}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                 ) : (
//                                                     dish.item_price
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Description:</div>
//                                             <div className="profile-value">
//                                                 {editMode ? (
//                                                     <input
//                                                         type="text"
//                                                         name="item_description"
//                                                         value={dish.item_description}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                 ) : (
//                                                     dish.item_description
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Ingredients:</div>
//                                             <div className="profile-value">
//                                                 <ul className="ingredient-list">
//                                                     {ingredients.map((ingredient, index) => (
//                                                         <li key={ingredient.id}>
//                                                             {editMode ? (
//                                                                 <>
//                                                                     <input
//                                                                         type="text"
//                                                                         name="ingredient_name"
//                                                                         value={ingredient.ingredient_name}
//                                                                         onChange={(e) =>
//                                                                             handleIngredientChange(index, e)
//                                                                         }
//                                                                     />
//                                                                     <input
//                                                                         type="text"
//                                                                         name="quantity"
//                                                                         value={ingredient.quantity}
//                                                                         onChange={(e) =>
//                                                                             handleIngredientChange(index, e)
//                                                                         }
//                                                                     />
//                                                                     <input
//                                                                         type="text"
//                                                                         name="unit"
//                                                                         value={ingredient.unit}
//                                                                         onChange={(e) =>
//                                                                             handleIngredientChange(index, e)
//                                                                         }
//                                                                     />
//                                                                 </>
//                                                             ) : (
//                                                                 <>
//                                                                     {ingredient.ingredient_name} (
//                                                                     {ingredient.quantity} {ingredient.unit})
//                                                                 </>
//                                                             )}
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Nutrition Values:</div>
//                                             <div className="profile-value">
//                                                 <ul className="nutrition-list">
//                                                     {nutritionValues.map((nutrition, index) => (
//                                                         <li key={nutrition.id}>
//                                                             {editMode ? (
//                                                                 <>
//                                                                     <label htmlFor={`calories-${index}`}>Calories:</label>
//                                                                     <input
//                                                                         type="text"
//                                                                         id={`calories-${index}`}
//                                                                         name="calories"
//                                                                         value={nutrition.calories}
//                                                                         onChange={(e) => handleNutritionChange(index, e)}
//                                                                     />
//                                                                     <label htmlFor={`protein-${index}`}>Protein:</label>
//                                                                     <input
//                                                                         type="text"
//                                                                         id={`protein-${index}`}
//                                                                         name="protein"
//                                                                         value={nutrition.protein}
//                                                                         onChange={(e) => handleNutritionChange(index, e)}
//                                                                     />
//                                                                     <label htmlFor={`sugar-${index}`}>Sugar:</label>
//                                                                     <input
//                                                                         type="text"
//                                                                         id={`sugar-${index}`}
//                                                                         name="sugar"
//                                                                         value={nutrition.sugar}
//                                                                         onChange={(e) => handleNutritionChange(index, e)}
//                                                                     />
//                                                                     <label htmlFor={`carbs-${index}`}>Carbs:</label>
//                                                                     <input
//                                                                         type="text"
//                                                                         id={`carbs-${index}`}
//                                                                         name="carbs"
//                                                                         value={nutrition.carbs}
//                                                                         onChange={(e) => handleNutritionChange(index, e)}
//                                                                     />
//                                                                     <label htmlFor={`fiber-${index}`}>Fiber:</label>
//                                                                     <input
//                                                                         type="text"
//                                                                         id={`fiber-${index}`}
//                                                                         name="fiber"
//                                                                         value={nutrition.fiber}
//                                                                         onChange={(e) => handleNutritionChange(index, e)}
//                                                                     />
//                                                                     <label htmlFor={`fat-${index}`}>Fat:</label>
//                                                                     <input
//                                                                         type="text"
//                                                                         id={`fat-${index}`}
//                                                                         name="fat"
//                                                                         value={nutrition.fat}
//                                                                         onChange={(e) => handleNutritionChange(index, e)}
//                                                                     />
//                                                                 </>
//                                                             ) : (
//                                                                 <>
//                                                                     <strong>Calories:</strong> {nutrition.calories}
//                                                                     <br />
//                                                                     <strong>Protein:</strong> {nutrition.protein}
//                                                                     <br />
//                                                                     <strong>Sugar:</strong> {nutrition.sugar}
//                                                                     <br />
//                                                                     <strong>Carbs:</strong> {nutrition.carbs}
//                                                                     <br />
//                                                                     <strong>Fiber:</strong> {nutrition.fiber}
//                                                                     <br />
//                                                                     <strong>Fat:</strong> {nutrition.fat}
//                                                                     <br />
//                                                                 </>
//                                                             )}
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         </div>

//                                         {editMode ? (
//                                             <button onClick={handleSaveClick}>Save</button>
//                                         ) : (
//                                             <button onClick={handleEditClick}>Edit</button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }







// import React, { useEffect, useState } from 'react';

// export default function DishDetail(props) {
//     const [dish, setDish] = useState(props.dish);
//     const [ingredients, setIngredients] = useState([]);
//     const [nutritionValues, setNutritionValues] = useState([]);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const ingredientsResponse = await fetch(
//                     `http://localhost:8000/api/DishIngredients?dishId=${dish.id}`
//                 );
//                 const ingredientsData = await ingredientsResponse.json();
//                 setIngredients(ingredientsData);

//                 const nutritionResponse = await fetch(
//                     `http://localhost:8000/api/DishNutrients?dishId=${dish.id}`
//                 );
//                 const nutritionData = await nutritionResponse.json();
//                 setNutritionValues(nutritionData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }

//         if (dish) {
//             fetchData();
//         }
//     }, [dish]);

//     useEffect(() => {
//         console.log(nutritionValues);
//     }, [nutritionValues])

//     return (
//         <div className="content-wrapper">
//             <section className="content-header">
                // <div className="container-fluid">
                //     <div className="row mb-2">
                //         <div className="col-sm-6">
                //             <h1>Dashboard</h1>
                //         </div>
                //         <div className="col-sm-6">
                //             <ol className="breadcrumb float-sm-right">
                //                 <li className="breadcrumb-item">
                //                     <a href="#">Home</a>
                //                 </li>
                //                 <li className="breadcrumb-item active">Restaurant Requests</li>
                //             </ol>
                //         </div>
                //     </div>
                // </div>
//             </section>
//             <section className="content">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="card">
//                             <div className="card-header border-transparent">
                                // <h3 className="card-title">Dish Detail</h3>
                                // <div className="card-tools">
                                //     <button
                                //         type="button"
                                //         className="btn btn-tool"
                                //         data-card-widget="collapse"
                                //     >
                                //         <i className="fas fa-minus" />
                                //     </button>
                                //     <button
                                //         type="button"
                                //         className="btn btn-tool"
                                //         data-card-widget="remove"
                                //     >
                                //         <i className="fas fa-times" />
                                //     </button>
                                // </div>
//                             </div>
//                             <div className="card-body">
//                                 <div className="profile">
//                                     <img
//                                         src={`http://localhost:8000/${dish.image}`}
//                                         alt="Dish"
//                                         className="profile-image"
//                                     />
//                                     <div className="profile-details">
//                                         <div className="profile-row">
//                                             <div className="profile-label">Item ID:</div>
//                                             <div className="profile-value">{dish.id}</div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Name:</div>
//                                             <div className="profile-value">{dish.item_name}</div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Price:</div>
//                                             <div className="profile-value">{dish.item_price}</div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Description:</div>
//                                             <div className="profile-value">
//                                                 {dish.item_description}
//                                             </div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Ingredients:</div>
//                                             <div className="profile-value">
//                                                 <ul className="ingredient-list">
//                                                     {ingredients.map((ingredient) => (
//                                                         <li key={ingredient.id}>
//                                                             {ingredient.ingredient_name} (
//                                                             {ingredient.quantity} {ingredient.unit})
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                         <div className="profile-row">
//                                             <div className="profile-label">Nutrition Values:</div>
//                                             <div className="profile-value">
//                                                 <ul className="nutrition-list">
//                                                     {nutritionValues.map((nutrition) => (
//                                                         <React.Fragment key={nutrition.id}>
//                                                             <li>calories: {nutrition.calories}</li>
//                                                             <li>protein: {nutrition.protein}</li>
//                                                             <li>sugar: {nutrition.sugar}</li>
//                                                             <li>carbs: {nutrition.carbs}</li>
//                                                             <li>fiber: {nutrition.fiber}</li>
//                                                             <li>fat: {nutrition.fat}</li>
//                                                         </React.Fragment>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }
