import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import Footer from './components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CityRestaurant() {
  const Location = useLocation();
  const Navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      let result = await fetch(
        'http://localhost:8000/api/cityRestaurant?longitude=' +
          Location.state.longitude +
          '&latitude=' +
          Location.state.latitude
      );
      result = await result.json();
      setData(result);
    }
    getData();
  }, []);

  return (
    <div className="container-xxl bg-white p-0">
      {/* Restaurant Hero */}
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            {Location.state.city}
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                {Location.state.city}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container">
        {data.length === 0 ? (
          <div className="text-center">
            <FontAwesomeIcon icon={faSadTear} size="3x" color="#FF8C00" />
            <h2>No restaurants available in {Location.state.city}</h2>
            <p>Explore other cities or check back later.</p>
            {/* Add additional UI components or buttons for navigation */}
          </div>
        ) : (
          <div className="row">
            {data.map((item) => (
              <div
                key={item.id}
                className="col-lg-3 col-md-4 col-sm-6"
              >
                <div
                  className="restaurant-card"
                  onClick={() =>
                    Navigate('/restaurant_profile', {
                      state: {
                        restaurant_id: item.id,
                        restaurant_name: item.r_name,
                      },
                    })
                  }
                >
                  <img
                    src={'http://localhost:8000/' + item.logo}
                    alt="Restaurant 1"
                  />
                  <div className="restaurant-details">
                    <h2 className="restaurant-name">{item.r_name}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
