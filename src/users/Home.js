import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Reservation from "./components/Reservation";
import Restaurants from "./components/Restaurants";
import Service from "./components/Service";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import Comparison from "./components/Comparison";
import Header from "./components/Header";
import Select from 'react-select';
import Cities from "./components/Cities";
import AdsSection from "./components/AdsSection";
// import { Eye, Facebook, Google, Lock, Email, EyeSlash } from 'react-bootstrap-icons'; 

function Home() {
    const Navigate = useNavigate();
    const [restaurant_id, setSelectedOption1] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(null);
    const [login, setLogin] = useState('login');
    const [status, setStatus] = useState(true);;
    const [inputValue, setInputValue] = useState(null);
    const [auth, setAuth] = useState(false);
    const [restaurant, setRestaurant] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('User-info')) {
            setAuth(true);
        }
    }, [])

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



    async function signup() {
        let item = { name, email, password };

        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        result = await result.json();

        localStorage.setItem("User-info", JSON.stringify(result));

        window.location.reload();
    };

    async function Login() {
        let item = { email, password };
        if (status) {
            let result = await fetch("http://localhost:8000/api/restaurant_login", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            result = await result.json();
            if (result['r_name']) {
                localStorage.setItem("Restaurant-info", JSON.stringify(result));
                Navigate('/restaurant_dashboard')
            }
            else {
                alert(JSON.stringify(result));
            }
        }
        else {
            let result = await fetch("http://localhost:8000/api/login", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            result = await result.json();
            if (result[0]['name']) {
                localStorage.setItem("User-info", JSON.stringify(result));
                window.location.reload();
            }
            else {
                alert(JSON.stringify(result));
            }
        }
    }
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: '#333', // Set the desired color for the option text
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
        <div className="container-xxl bg-white p-0">
            <Header cmp={'home'} />
            {/* landing page */}
            <section className="container-xxl bg-white p-0">
                <div className="container-xxl py-5 bg-dark hero-header mb-5">
                    <div className="container my-5 py-5">
                        <div className="row align-items-center g-5">
                            <div className="col-lg-6 text-center text-lg-start">
                                <h1 className="display-3 text-white animated slideInLeft">Enjoy Our<br />Delicious Meal</h1>
                                <p className="text-white animated slideInLeft mb-4 pb-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
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
                            <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                                <img className="img-fluid" src="img/hero.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Restaurants />
            <Cities />
            <AdsSection/>
            <About />
            {/* <Menu /> */}
            <Service />
            <Footer />
        </div>
    )
}
export default Home;