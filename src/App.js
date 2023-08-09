import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
// import Login from './Login';
import Home from './users/Home';
import Restaurant from './Restaurant';
import Protected from './Protected';
import Dashboard from './Admin/Dashboard';
import Requests from './Admin/components/Requests';
import RequestForm from './users/RequestForm';
import RestaurantDashboard from './Restaurant/RestaurantDashboard';
import RestaurantMenu from './Restaurant/components/RestaurantMenu';
import RestaurantProfile from './users/RestaurantProfile';
import ComparisonScreen from './users/ComparisonScreen';
import CityRestaurant from './users/CityRestaurant';
import ProtectedRestaurant from './ProtectedRestaurant';


function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          {/* <Route path='/login' element={<Login />} /> */}
          <Route path='/' element={<Home />} />
          {/* Restaurant side */}
          <Route path='/restaurant_dashboard' element={<ProtectedRestaurant Cmp={RestaurantDashboard}/>} />
          <Route path='/restaurant_menu' element={<RestaurantMenu/>} />



          {/* protected components */}
          <Route path='/restuarant' element={<Protected Cmp={Restaurant} />} />
          <Route path='/requestform' element={<RequestForm/>} />
          <Route path='/comparisonscreen' element={<Protected Cmp={ComparisonScreen} />} />
          <Route path='/restaurant_profile' element={<RestaurantProfile />} />
          <Route path='/cityRestaurant' element={<CityRestaurant/>} />

          {/* Admin side */}
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
