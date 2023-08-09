import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { IPContext } from '../IPContext';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

const RestaurantProfile = ({ route, navigation }) => {
  const [restaurants, setRestaurant] = useState(route.params.restaurant);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [category_id, setCategoryId] = useState(null);
  const [whichCategory, setWhichCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [dish_id, setDishId] = useState(null);
  const [dish_name, setDishName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [amount, setDishPrice] = useState(null);
  const [servingSize, setServingSize] = useState([]);
  const [auth, setAuth] = useState(false);

  const ipAddress = useContext(IPContext);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params && route.params.message) {
        alert(route.params.message);
      }
    }, [])
  );
  const renderStars = (dish) => {
    const rating = dish.avg_rating;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={15} color="#FF8C00" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key={filledStars} name="star-half" size={15} color="#FF8C00" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={filledStars + (hasHalfStar ? 1 : 0) + i} name="star-outline" size={15} color="#FF8C00" />);
    }
    return stars;
  };
  const renderRestaurantStars = (star) => {
    const rating = star;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={15} color="#FF8C00" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key={filledStars} name="star-half" size={15} color="#FF8C00" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={filledStars + (hasHalfStar ? 1 : 0) + i} name="star-outline" size={15} color="#FF8C00" />);
    }
    return stars;
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuth(true);
        try {
          const response = await fetch('http://' + ipAddress.ipAddress + ':8000/api/userInfo?token=' + token)
          const result = await response.json();
          setUserId(result.id);
        } catch (error) {
          alert(error);
          // Handle login error, display an error message, etc.
        }
      }
    };
    checkToken();
  }, [])

  useEffect(() => {
    async function getCategories() {
      let item = restaurants.id;
      let result = await fetch('http://' + ipAddress.ipAddress + ':8000/api/restaurantCategories?restaurant_id=' + item);
      result = await result.json();
      setCategories(result);
      setWhichCategory('check');
    };
    if (restaurants) {
      getCategories();
    }
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [restaurants, whichCategory])

  useEffect(() => {
    async function getDish() {
      setIsLoading(true);
      let restaurant_id = restaurants.id;
      let item = { category_id, restaurant_id };
      let result = await fetch('http://' + ipAddress.ipAddress + ':8000/api/Category_dishes', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      result = await result.json();
      setDishes(result);
      setIsLoading(false);
    }
    if (category_id != null) {
      getDish();
    }

  }, [category_id])

  const showCustomAlert = (dishId, name) => {
    setDishId(dishId);
    setDishName(name);
    setShowAlert(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://' + ipAddress.ipAddress + ':8000/api/serving_size?dish_id=' + dish_id);
        const result = await response.json();
        setServingSize(result);
      } catch (error) {
        alert(error);
      }
    };
    if (dish_id) {
      fetchData();
    }
  }, [dish_id]);

  useEffect(() => {
    if (servingSize.length > 0) {
      setSelectedType(servingSize[0].id);
      setDishPrice(servingSize[0].price)
    }
  }, [servingSize])

  useEffect(() => {
    if (!showAlert) {
      setServingSize([]);
    }
  }, [showAlert])

  const handlePlaceOrder = async() => {
    // Logic for placing the order
    if (auth) {
      navigation.navigate('ScanQRCode', {
        dish_id: dish_id,
        serving_size_id: selectedType,
        amount: amount,
        screen: 'profile',
        restaurant: restaurants,
      })
      setShowAlert(false);
    }
    else {
      alert('Please Login to place order')
    }
  };

  const handleAddToCart = async () => {
    if (auth) {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('dish_id', dish_id);
      formData.append('serving_size_id', selectedType);
      formData.append('dish_name', dish_name);
      formData.append('restaurant_id', restaurants.id);
      formData.append('restaurant_name', restaurants.r_name);
      formData.append('amount', amount);
      try {
        let response = await fetch('http://' + ipAddress.ipAddress + ':8000/api/addtoCart', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorResponse = await response.text();
          throw new Error(errorResponse);
        }
        const successResponse = await response.json();
        alert(successResponse);
        setShowAlert(false);
      } catch (error) {
        alert(error);
      }
    }
    else {
      alert('Please Login to add to cart')
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal visible={showAlert} transparent>
        <TouchableOpacity style={styles.modalContainer} onPress={() => setShowAlert(false)}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>Select Dish Type</Text>
            <RadioButton.Group
              onValueChange={(value) => {
                const selectedSize = servingSize.find((size) => size.id === value);
                setSelectedType(selectedSize.id);
                setDishPrice(selectedSize.price);
              }}
              value={selectedType}
            >
              <View style={styles.radioButtonContainer}>
                {
                  servingSize.map((size) => (
                    <View key={size.id} style={styles.radioButtonItem}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton.Android value={size.id} />
                        <Text style={styles.radioButtonLabel}>{size.size}</Text>
                      </View>
                      <Text style={styles.itemPrice}>Rs-{size.price}</Text>
                    </View>
                  ))
                }
              </View>
            </RadioButton.Group>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                <Text style={styles.buttonText}>Place Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Image
        source={{ uri: 'http://' + ipAddress.ipAddress + ':8000/' + restaurants.logo }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{restaurants.r_name}</Text>
        {/* <Text style={styles.cuisine}>{restaurant.cuisine} Cuisine</Text> */}
        <View style={styles.ratingContainer}>
          {/* <Ionicons name="star" size={16} color="#FFC107" /> */}
          {renderRestaurantStars(restaurants.avg_rating)}
          {/* <Text style={styles.rating}>{restaurants.avg_rating}</Text> */}
          <Text style={styles.reviews}>Reviews</Text>
        </View>
        <Text style={styles.location}>{restaurants.address}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="call-outline" size={16} color="#888" />
          <Text style={styles.contact}> {restaurants.phone_no} </Text>
        </View>
        {/* <Text style={styles.openingHours}>{restaurant.openingHours}</Text> */}
      </View>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            categories.map((category, index) => (
              <TouchableOpacity key={index} style={[styles.categoryItem, category_id === category.id && { borderBottomWidth: 5, borderBottomColor: '#FF8C00', borderRadius: 3 }]} onPress={() => setCategoryId(category.id)}>
                <Text style={styles.categoryText}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#FF8C00" />
      ) : (
        <View style={styles.menuContainer}>
          {
            dishes.map((dish, index) => (
              <View key={index} style={styles.menuItem}>
                <View style={styles.menuDetail}>
                  <TouchableOpacity onPress={() => alert(dish.item_description)}>
                    <Text style={styles.itemName}>{dish.item_name.charAt(0).toUpperCase() + dish.item_name.slice(1)}</Text>
                    <View style={styles.ratingContainer1}>
                      <Text style={[styles.itemPrice, { paddingRight: 5 }]}>({dish.avg_rating.substring(0, 3)})</Text>
                      {renderStars(dish)}
                    </View>
                    {/* <Text style={styles.itemPrice}>Rs.{dish.item_price}</Text> */}
                  </TouchableOpacity>
                </View>
                <View style={styles.menuImageContainer}>
                  <Image style={styles.itemImage} source={{ uri: 'http://' + ipAddress.ipAddress + ':8000/' + dish.image }} />
                  <TouchableOpacity style={styles.plusIcon} onPress={() => showCustomAlert(dish.id, dish.item_name)}>
                    <Ionicons name="add" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          }
        </View>
      )}
      <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name={'keyboard-arrow-left'} size={40} color="#FF8C00" />
      </TouchableOpacity>
    </ScrollView >
  );
};

export default RestaurantProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 10,
    padding: 16,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeOrderButton: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  leftbarButton: {
    position: 'absolute',
    left: Dimensions.get('window').width * 0.02,
    top: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: "center"
  },
  image: {
    width: '100%',
    height: '30%',
  },
  detailsContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cuisine: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  reviews: {
    fontSize: 16,
    color: '#888',
  },
  location: {
    fontSize: 16,
    marginBottom: 8,
  },
  openingHours: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  categoryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryItem: {
    marginHorizontal: 16,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  contact: {
    fontSize: 16,
  },
  menuContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    position: 'relative'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  menuDetail: {
    flex: 1,
    marginRight: 20,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  menuImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  plusIcon: {
    backgroundColor: '#FF8C00',
    borderRadius: 15,
    width: 30,
    height: 30,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '60%', // Adjust this value to move the icon up or down
    right: -10, // Center the icon horizontally
  },
  radioButtonContainer: {
    marginTop: 10,
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between'
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  loader: {
    marginTop: 16,
  },
  ratingContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    marginRight: 5,
  },
});
