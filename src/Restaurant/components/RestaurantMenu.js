import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import Header from './Header'
import Menu from './Menu'
import Form from 'react-bootstrap/Form';
import { Prev } from 'react-bootstrap/esm/PageItem';
import Spinner from 'react-bootstrap/Spinner';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import DishDetail from './DishDetail';
export default function RestaurantMenu() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [r_id, setRestaurantId] = useState(null);
    const [item_name, setName] = useState(null);
    const [nameError, setNameError] = useState(false);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [categoryImage, setCategoryImage] = useState(null);
    const [c_id, setCategoryId] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [restaurant_info, setRestaurantinfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ingredients, setIngredients] = useState([{ id: null, name: "", quantity: 0, unit: "" }]);
    const [ingredientsError, setIngredientsError] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [foodList, setFoodList] = useState([]);
    const [isLoading, setLoading] = useState();
    const [isSearchsLoading, setSearchLoading] = useState();
    const [check, setCheck] = useState(null);
    const [selectedDish, setSelectedDish] = useState(null);
    const [servingSize, setServingSize] = useState([{ size: "", price: "" }]);


    useEffect(() => {
        setRestaurantinfo(JSON.parse(localStorage.getItem('Restaurant-info')));
        if (restaurant_info.length !== 0) {
            setRestaurantId(restaurant_info.id);
        }
    }, [restaurant_info.length])

    useEffect(() => {
        async function getData() {
            let item = { r_id };
            let result = await fetch('http://localhost:8000/api/dishes', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            result = await result.json();
            setData(result);
        }
        async function getCategory() {
            let result = await fetch('http://localhost:8000/api/all_dish_categories')
            result = await result.json();
            setCategory(result);
        }
        if (r_id != null) {
            getData();
            getCategory();
        }
    }, [show, r_id])

    const units = [
        { id: "1", name: "gram", symbol: "g" },
        { id: "2", name: "kilogram", symbol: "kg" },
        { id: "3", name: "milligram", symbol: "mg" },
        { id: "4", name: "microgram", symbol: "mcg" },
        { id: "5", name: "ounce", symbol: "oz" },
        { id: "6", name: "pound", symbol: "lb" },
        { id: "7", name: "fluid ounce", symbol: "fl oz" },
        { id: "8", name: "cup", symbol: "cup" },
        { id: "9", name: "quart", symbol: "qt" },
        { id: "10", name: "milliliter", symbol: "ml" },
        { id: "11", name: "liter", symbol: "l" }
    ];
    async function saveData(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', item_name);
        formData.append('price', 300);
        formData.append('description', description);
        formData.append('restaurant_id', r_id);
        formData.append('category_id', c_id);
        formData.append('newCategory_name', newCategoryName);
        formData.append('newCategory_image', categoryImage);
        formData.append('image', image);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('serving_size', JSON.stringify(servingSize));

        setLoading(true);

        try {
            let response = await fetch('http://localhost:8000/api/add_dish', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                throw new Error(errorResponse);
            }

            const successResponse = await response.json();
            setLoading(false);
            alert(successResponse);
            setData([]);
            setCategory([]);
            setNewCategoryName('');
            setName(null);
            setPrice(null);
            setDescription(null);
            setImage(null);
            setCategoryImage(null);
            setCategoryId(null);
            setIngredients([{ id: null, name: "", quantity: 0, unit: "" }]);
            setServingSize([{ size: "", price: "" }]);
            setCurrentPage(1);
            setFoodList([]);
        } catch (error) {
            setLoading(false);
            alert(error);
        }
    }

    function form(e) {
        e.preventDefault();
        const form = document.getElementById('form');
        // form.reset();
    }

    const handleDishNameChange = async (e) => {
        const inputValue = e.target.value;
        const regex = /^[a-zA-Z\s]+$/;

        if (inputValue == '') {
            setName('');
        }
        else if (regex.test(inputValue)) {
            setName(inputValue);
            setNameError(false);
        } else {
            setNameError(true);
        }
    }

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    const handleAddIngredient = () => {
        setIngredients([
            ...ingredients,
            { id: null, name: "", quantity: 0, unit: "" }
        ]);
        console.log(ingredients);
    };

    const handleIngredientChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...ingredients];
        list[index][name] = value;
        setIngredients(list);
    };
    const handleServingSizeChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...servingSize];
        list[index][name] = value;
        setServingSize(list);
    };
    const handleAddServingSize = () => {
        setServingSize([
            ...servingSize,
            { size: "", price: "" }
        ]);
    };
    const handleSearch = async (index) => {
        setSearchLoading(true);
        try {
            const response = await fetch(
                `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchTerm}&pageSize=25&dataType=SR%20Legacy&api_key=oZgQtcoTTLruzpvSN7nV2l5I4oq34Xx7V3OeE5HJ`
            );
            const data = await response.json();
            const addfood = data.foods;
            setFoodList((prevFoodList) => {
                const newFoodList = [...prevFoodList];
                newFoodList[index] = addfood;
                return newFoodList;
            });
            setSearchLoading(false);
        } catch (error) {
            setSearchLoading(false);
            console.error(error);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={() => setShow(false) + setCurrentPage(1)}>
                <Modal.Header closeButton>Edit Item</Modal.Header>
                <Modal.Body>
                    <>
                        {
                            isLoading && (
                                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light opacity-75">
                                    <Spinner animation="border" variant="primary" />
                                </div>
                            )
                        }
                        <form id='form' onSubmit={saveData}>
                            {
                                currentPage == 1 && (
                                    <div className="text-center mb-1">
                                        <h5 className="mt-1 mb-2">Item Detail</h5>
                                        <div className='mt-4'>
                                            <input value={item_name} onChange={handleDishNameChange} type="text" id="form29" className="form-control form-control-sm" placeholder='Item Name' />
                                            {
                                                nameError && (
                                                    <span className='text-start'>Please use alphabetic characters only</span>
                                                )
                                            }
                                        </div>
                                        {/* <div className='mt-4'>
                                            <input value={price} onChange={(text) => setPrice(text.target.value)} type="text" id="form29" className="form-control form-control-sm" placeholder='Item Price' />
                                        </div> */}
                                        <div className='mt-4'>
                                            <textarea value={description} onChange={(text) => setDescription(text.target.value)} type="text" id="form29" className="form-control" placeholder='Item Description' />
                                        </div>
                                        <div className='mt-4'>
                                            <input onChange={(text) => setImage(text.target.files[0])} type="file" accept="image/png, image/jpeg" id="form29" className="form-control" placeholder='Photo' />
                                        </div>
                                        <div className='mt-4'>
                                            <Form.Select size='md' onChange={(e) => setCategoryId(e.target.value)}>
                                                <option>Select Category</option>
                                                {
                                                    category.map((item) => (
                                                        <option value={item.id}>{item.name}</option>
                                                    ))
                                                }
                                                <option value="other">Other</option>
                                            </Form.Select>
                                            {c_id === "other" && (
                                                <>
                                                    <div className="mt-2">
                                                        <input onChange={(text) => setNewCategoryName(text.target.value)} type="text" id="form29" className="form-control" placeholder='Category Name' />
                                                    </div>
                                                    <div className="mt-2">
                                                        <input onChange={(text) => setCategoryImage(text.target.files[0])} type="file" accept="image/png, image/jpeg" id="form29" className="form-control" placeholder='Photo' />
                                                    </div>
                                                </>
                                            )
                                            }

                                        </div>
                                        {
                                            item_name != null && price != null && description != null && image != null && c_id != null && nameError === false && (
                                                <div className="text-end mt-4">
                                                    <button onClick={nextPage} className="btn text-white btn-sm mt-1">Next<i className="fas fa-sign-in ml-1" /></button>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                            {
                                currentPage === 2 && (
                                    <div className="text-center mb-1">
                                        <div>
                                            <h4 className="mt-1 mb-2">
                                                Ingredients
                                            </h4>
                                        </div>
                                        {ingredients.map((ingredient, index) => (
                                            <div key={index}>
                                                <h5 className='text-start mt-4'>Ingredient {index + 1}</h5>
                                                <div className="input-group">
                                                    <input type="search" className="form-control" aria-label="Search" aria-describedby="search-addon"
                                                        name='name'
                                                        placeholder="Name"
                                                        value={ingredient.name}
                                                        required
                                                        onChange={(text) => handleIngredientChange(index, text) + setSearchTerm(text.target.value)}
                                                    />
                                                    <button type="button" disabled={isSearchsLoading ? true : false} className="btn btn-outline-primary" onClick={() => handleSearch(index)}>{isSearchsLoading ? 'Searching....' : 'Search'}</button>
                                                </div>
                                                <div className='mt-4'>
                                                    {
                                                        foodList[index] && (
                                                            <Form.Select name='id' size='md' value={ingredient.id} onChange={(e) => handleIngredientChange(index, e) + setIngredientsError(false)} required>
                                                                <option>Select Ingredient</option>
                                                                {
                                                                    foodList[index].map((food) => (
                                                                        <option value={food.fdcId}>{food.description}</option>
                                                                    ))
                                                                }
                                                            </Form.Select>
                                                        )
                                                    }
                                                </div>
                                                <div className='mt-4'>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name='quantity'
                                                        placeholder="Quantity"
                                                        required
                                                        value={ingredient.quantity}
                                                        min={0}
                                                        onChange={(event) => handleIngredientChange(index, event)}
                                                    />
                                                </div>
                                                <div className='mt-4'>
                                                    {
                                                        <Form.Select name='unit' size='md' value={ingredient.unit} onChange={(e) => handleIngredientChange(index, e)} required>
                                                            <option>Select Unit</option>
                                                            {
                                                                units.map((unit) => (
                                                                    <option value={unit.name}>{unit.name}</option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                    }
                                                </div>
                                                {
                                                    ingredientsError && (
                                                        <span>Please add ingredient's detail</span>
                                                    )
                                                }
                                            </div>
                                        ))}
                                        <div className='text-start mt-2'>
                                            <button className="btn btn-primary bt-sm" onClick={handleAddIngredient}>
                                                Add Ingredient
                                            </button>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <button onClick={prevPage} className="btn text-white btn-sm mt-1">Previous<i className="fas fa-sign-in ml-1" /></button>
                                            {
                                                ingredients[0].name !== '' && ingredients[0].quantity !== 0 && ingredients[0].unit !== "" && (
                                                    <button onClick={nextPage} className="btn text-white btn-sm mt-1">Next<i className="fas fa-sign-in ml-1" /></button>
                                                )
                                            }
                                            {/* <button type='submit' className="btn btn-success btn-sm mt-1">Submit<i className="fas fa-sign-in ml-1" /></button> */}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                currentPage === 3 && (
                                    <div className="text-center mb-1">
                                        <div>
                                            <h4 className="mt-1 mb-2">
                                                Serving Size
                                            </h4>
                                        </div>
                                        {servingSize.map((size, index) => (
                                            <div key={index}>
                                                <h5 className='text-start mt-4'>Serving Size {index + 1}</h5>
                                                <div className='mt-4'>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name='size'
                                                        placeholder="Size"
                                                        required
                                                        value={size.name}
                                                        onChange={(event) => handleServingSizeChange(index, event)}
                                                    />
                                                </div>
                                                <div className='mt-4'>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        min={0}
                                                        name='price'
                                                        placeholder="Price"
                                                        required
                                                        value={size.price}
                                                        onChange={(event) => handleServingSizeChange(index, event)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <div className='text-start mt-2'>
                                            <button className="btn btn-primary bt-sm" onClick={handleAddServingSize}>
                                                Add More Serving Size
                                            </button>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <button onClick={prevPage} className="btn text-white btn-sm mt-1">Previous<i className="fas fa-sign-in ml-1" /></button>
                                            {
                                                servingSize[0].size !== "" && servingSize[0].price !== "" && (
                                                    <button type='submit' className="btn btn-success btn-sm mt-1">Submit<i className="fas fa-sign-in ml-1" /></button>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </form>
                    </>
                </Modal.Body>
            </Modal>
            {
                check === null && (
                    <div className='content-wrapper'>
                        <section className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>Dashboard</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                                            <li className="breadcrumb-item active">Restaurant Requests</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="content">
                            <div className='row'>
                                <div className='col-    md-12'>
                                    <div className="card">
                                        <div className="card-header border-transparent">
                                            <h3 className="card-title">All Items</h3>
                                            <div className="card-tools">
                                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                    <i className="fas fa-minus" />
                                                </button>
                                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                                    <i className="fas fa-times" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table className="table m-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Item ID</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Description</th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data.map((item) => (
                                                                <tr onClick={() => setCheck('DishProfile') + setSelectedDish(item)} className='pointer'>
                                                                    <td>{item.id}</td>
                                                                    <td>{item.item_name}</td>
                                                                    <td>{item.item_price}</td>
                                                                    <td>
                                                                        {item.item_description.substring(0, 10)}
                                                                        {item.item_description.length > 10 && '.....'}
                                                                    </td>

                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="card-footer clearfix">
                                            <a onClick={() => setShow(true)} className="btn btn-sm btn-secondary float-right">Add Item</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }
            {
                check === 'DishProfile' && (
                    <DishDetail dish={selectedDish} />
                )
            }

        </div>
    )
}
