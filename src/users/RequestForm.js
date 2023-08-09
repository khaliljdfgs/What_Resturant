import React, { useState, useRef, useEffect } from 'react';
import Restaurant from '../Restaurant';
import Footer from './components/Footer';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhbmkzMiIsImEiOiJjbGl2enFsdHMwbmMyM2pvMmhjamFocW4zIn0.qn7A21vSUGbMhTefdH5iYg';

export default function RequestForm() {
    const Navigate=useNavigate();
    const [suggestions, setSuggestions] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location_latitude, setLocationLatitude] = useState(null);
    const [location_longitude, setLocationLongitude] = useState(null);
    const [fulladdress, setFulladdress] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [r_name, setRestaurant] = useState('');
    const [o_name, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [cnic, setCnic] = useState('');
    const [address, setaddress] = useState('');
    const [phone_no, setPhone_no] = useState('');
    const [logo, setLogo] = useState('');
    const [id_copy, setIdcopy] = useState('');

    async function saveData() {
        const formData = new FormData();
        formData.append('r_name', r_name);
        formData.append('email', email);
        formData.append('o_name', o_name);
        formData.append('address', fulladdress);
        formData.append('longitude', longitude);
        formData.append('latitude', latitude);
        formData.append('location_longitude', location_longitude);
        formData.append('location_latitude', location_latitude);
        formData.append('phone_no', phone_no);
        formData.append('cnic', cnic);
        formData.append('logo', logo);
        formData.append('id_copy', id_copy);

        let result = await fetch('http://localhost:8000/api/request_to_register', {
            method: 'POST',
            body: formData,
        });
        result = await result.json();
        alert(result);

        setRestaurant('');
        setEmail('');
        setOwner('');
        setaddress('');
        setFulladdress('');
        setPhone_no('');
        setCnic('');
        setLocationLatitude('');
        setLocationLongitude('');
        setLogo('');
        setIdcopy('');
        Navigate('/');
    }

    const handleCNICChange = (event) => {
        const { value } = event.target;

        // Remove any non-digit characters from the input value
        const numericValue = value.replace(/\D/g, '');

        // Format the CNIC number with dashes after every fifth digit
        const formattedCNIC = numericValue.replace(/(\d{5})(\d{7})/, '$1-$2');

        // Update the CNIC state with the formatted value
        setCnic(formattedCNIC);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setaddress(value);
        const accessToken =
            'pk.eyJ1Ijoic2hhbmkzMiIsImEiOiJjbGl2enFsdHMwbmMyM2pvMmhjamFocW4zIn0.qn7A21vSUGbMhTefdH5iYg';

        if (value.trim() !== '') {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                value
            )}.json?access_token=${accessToken}&autocomplete=true`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.features && data.features.length > 0) {
                        setSuggestions(data.features.map((feature) => feature.place_name));
                    } else {
                        setSuggestions([]);
                    }
                })
                .catch((error) => {
                    alert('Error:', error);
                });
        } else {
            setSuggestions([]);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                function (error) {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        let map;
        let marker;

        if (latitude && longitude) {
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [longitude, latitude],
                zoom: 12,
            });

            marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

            marker.setDraggable(true);

            mapRef.current = map;
        }
        const handleMarkerDragEnd = () => {
            const newLngLat = marker.getLngLat();
            const newLongitude = newLngLat.lng;
            const newLatitude = newLngLat.lat;

            setLocationLatitude(newLatitude);
            setLocationLongitude(newLongitude);
            // Use the newLongitude and newLatitude values as needed
        };


        if (marker) {
            marker.on('dragend', handleMarkerDragEnd);
        }

        return () => {
            if (marker) {
                marker.off('dragend', handleMarkerDragEnd);
                marker.remove();
            }
            if (map) {
                map.remove();
            }
        };
    }, [latitude, longitude]);

    const getCityName = async (latitude, longitude) => {
        const accessToken = 'pk.eyJ1Ijoic2hhbmkzMiIsImEiOiJjbGl2enFsdHMwbmMyM2pvMmhjamFocW4zIn0.qn7A21vSUGbMhTefdH5iYg';
        const latitudeDelta = 0.0922;
        const longitudeDelta = 0.0421;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&bbox=${longitude - longitudeDelta},${latitude - latitudeDelta},${longitude + longitudeDelta},${latitude + latitudeDelta}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            // Extract the city name from the response
            const cityName = data.features[0].place_name;
            setLocationName(cityName);
        } catch (error) {
            console.error('Error:', error);
            return 'Unknown';
        }
    };


    useEffect(() => {
        if (location_latitude && location_longitude) {
            getCityName(location_latitude, location_longitude);
            console.log(location_latitude);
            console.log(location_longitude)
        }
    }, [location_latitude, location_longitude])


    const handleSuggestionSelect = (suggestion) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            suggestion
        )}.json?access_token=${mapboxgl.accessToken}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.features && data.features.length > 0) {
                    const coordinates = data.features[0].geometry.coordinates;
                    const longitude = coordinates[0];
                    const latitude = coordinates[1];
                    setLongitude(longitude);
                    setLatitude(latitude);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setaddress(suggestion);
        setSuggestions([]);
    };

    const renderSuggestions = () => {
        return suggestions.map((suggestion, index) => (
            <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionSelect(suggestion)}
            >
                {suggestion}
            </div>
        ));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your form submission logic goes here
        saveData();
    };

    return (
        <section className="container-xxl bg-white p-0">
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
                <div className="container my-5 py-5">
                    <div className="row align-items-start g-5">
                        <div className="col-lg-6 text-center text-lg-start">
                            <h1 className="display-3 text-white animated slideInLeft">Partner with us</h1>
                            <p className="text-white animated slideInLeft mb-4 pb-2">
                                Would you like millions of new customers to enjoy your amazing food and groceries? So would we!
                                It's simple: we list your menu and product lists online, help you process orders, pick them up, and deliver-
                                Interested? Let's start our partnership today!
                            </p>
                        </div>
                        <div className="col-lg-6 bg-white">
                            <form className="p-5" onSubmit={handleSubmit}>
                                <div>
                                    <h3>Fill in the form below to register your restaurant</h3>
                                    <div className="form-group">
                                        <input
                                            onChange={(text) => setOwner(text.target.value)}
                                            type="text"
                                            value={o_name}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={(text) => setRestaurant(text.target.value)}
                                            type="text"
                                            value={r_name}
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Restaurant Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={(text) => setEmail(text.target.value)}
                                            type="email"
                                            value={email}
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cnic"
                                            placeholder="Enter the 13-digit CNIC number (e.g., 12345-6789101)."
                                            value={cnic}
                                            onChange={handleCNICChange}
                                            pattern="[0-9]{5}-[0-9]{7}"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={(text) => setPhone_no(text.target.value)}
                                            type="text"
                                            value={phone_no}
                                            pattern='[0-9]*'
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Phone Number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={handleInputChange}
                                            value={address}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Select City"
                                            required
                                        />
                                        {suggestions.length > 0 && <div className="dropdown">{renderSuggestions()}</div>}
                                    </div>
                                    {
                                        address && (
                                            <div className="form-group">
                                                <input
                                                    value={locationName}
                                                    type="text"
                                                    disabled
                                                    className="form-control"
                                                    placeholder="Select Location From Map"
                                                    required
                                                />
                                            </div>
                                        )
                                    }
                                    <div id="map" style={{ width: '100%', height: '400px', marginBottom: 15 }}></div>
                                    <div className="form-group">
                                        <input
                                            onChange={(e)=>setFulladdress(e.target.value)}
                                            value={fulladdress}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Full Address"
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputFile">Choose Restaurant Logo:</label>
                                        <input
                                            type="file"
                                            onChange={(event) => {
                                                const selectedFile = event.target.files[0];
                                                setLogo(selectedFile);
                                            }}
                                            class="form-control-file"
                                            id="exampleInputFile"
                                            aria-describedby="fileHelp"
                                            accept="image/png, image/jpeg"
                                            required
                                        />
                                        <small id="fileHelp" class="form-text text-muted">
                                            Select a PNG/JPEG file to upload.
                                        </small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputFile">Choose ID Card Copy:</label>
                                        <input
                                            type="file"
                                            onChange={(text) => setIdcopy(text.target.files[0])}
                                            class="form-control-file"
                                            id="exampleInputFile"
                                            aria-describedby="fileHelp"
                                            accept="image/png, image/jpeg"
                                            required
                                        />
                                        <small id="fileHelp" class="form-text text-muted">
                                            Select a PNG/JPEG file to upload.
                                        </small>
                                    </div>
                                </div>
                                {/* /.card-body */}
                                <div>
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}