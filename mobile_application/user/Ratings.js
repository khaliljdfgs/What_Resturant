import { StyleSheet, Text, View, Dimensions, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPContext } from '../IPContext';
import { TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
import { TextInput } from 'react-native-paper';



const Ratings = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItemDishes, setSelectedItemDishes] = useState([]);
    const [userId, setUserId] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [restaurant_id, setRestaurantId] = useState(null);
    const [restaurant_ratings, setRestaurantAvgRating] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const ipAddress = useContext(IPContext);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
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
        async function getUserCart() {
            let result = await fetch('http://' + ipAddress.ipAddress + ':8000/api/getCompletedOrder?userId=' + userId);
            result = await result.json();
            setCartItems(result);
        };
        if (userId !== null) {
            getUserCart();
        }
    }, [userId, showAlert])
    const handleRatingChange = (index, rating) => {
        // Update the rating for the dish at the specified index
        const updatedDishes = [...selectedItemDishes];
        updatedDishes[index].avg_rating = rating;
        setSelectedItemDishes(updatedDishes);
    };
    const handleRestaurantRatingChange = (rating) => {
        setRestaurantAvgRating(rating);
    };
    const saveRatings = async () => {
        try {
            const dishRequests = selectedItemDishes.map((dish) => {
                const formData = new FormData();
                formData.append('dish_id', dish.id);
                formData.append('rating', dish.avg_rating);
                formData.append('order_id', orderId);

                return fetch('http://' + ipAddress.ipAddress + ':8000/api/addReview', {
                    method: 'POST',
                    body: formData,
                });
            });

            await Promise.all(dishRequests);

            const restaurantFormData = new FormData();
            restaurantFormData.append('restaurant_id', restaurant_id);
            restaurantFormData.append('rating', restaurant_ratings);

            await fetch('http://' + ipAddress.ipAddress + ':8000/api/addReviewRestaurant', {
                method: 'POST',
                body: restaurantFormData,
            });

            setShowAlert(false);
            alert('Ratings added successfully');
        } catch (error) {
            console.error('Error adding ratings:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Modal visible={showAlert} transparent>
                <TouchableOpacity style={styles.modalContainer} onPress={() => setShowAlert(false)}>
                    <View style={styles.alertContainer}>
                        <Text style={styles.alertTitle}>Give Ratings</Text>

                        <Text style={styles.subtitle}>Restaurant Rating:</Text>
                        <Rating
                            type="star"
                            ratingCount={5}
                            imageSize={20}
                            startingValue={restaurant_ratings}
                            onFinishRating={(rating) => handleRestaurantRatingChange(rating)}
                            style={styles.ratingStars}
                        />

                        <Text style={styles.subtitle}>Dish Ratings:</Text>
                        {selectedItemDishes.map((dish, index) => (
                            <View style={styles.ratingConatiner} key={index}>
                                <Text>{dish.item_name}</Text>
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    imageSize={20}
                                    startingValue={dish.avg_rating}
                                    onFinishRating={(rating) => handleRatingChange(index, rating)} // Replace handleRatingChange with your own function
                                />
                            </View>
                        ))}
                        <TouchableOpacity style={styles.placeOrderButton} onPress={saveRatings}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style={styles.header}>
                <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name={'keyboard-backspace'} size={35} color="#FF8C00" />
                </TouchableOpacity>
                <Text style={styles.popularRestaurantsText}>Ratings</Text>
            </View>
            <View>
                {
                    cartItems.map((item, index) => (
                        <View key={index} style={styles.cartList}>
                            <TouchableOpacity
                                style={[styles.cartItem, { backgroundColor: showAlert ? '#FF8C00' : 'white' }]} onPress={() => {
                                    setShowAlert(true);
                                    setSelectedItemDishes(item.dishes);
                                    setOrderId(item.order?.id);
                                    setRestaurantId(item.restaurant?.id);
                                    setRestaurantAvgRating(item.restaurant?.avg_rating)
                                }}>
                                <Text style={styles.itemPrice}>{item.order?.id}</Text>
                                <Text style={styles.itemPrice}>{item.restaurant?.r_name}</Text>
                                <Text style={styles.itemPrice}>{item.order?.date.substring(0, 10)}</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default Ratings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Dimensions.get('window').height * 0.04,
        paddingHorizontal: Dimensions.get('window').width * 0.03,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get('window').width * 0.03,
        paddingBottom: Dimensions.get('window').height * 0.02,
        paddingTop: Dimensions.get('window').height * 0.02,
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
    ratingConatiner: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    popularRestaurantsText: {
        fontSize: Dimensions.get('window').width * 0.05,
        fontWeight: 'bold',
        marginLeft: 15
    },
    cartList: {
        flexGrow: 1,
    },
    cartItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    itemName: {
        fontSize: 16,
        flex: 1,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    quantityButton: {
        fontSize: 20,
        paddingHorizontal: 8,
    },
    itemQuantity: {
        fontSize: 16,
        marginHorizontal: 8,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingBottom: Dimensions.get('window').height * 0.04
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearCartText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkoutButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    placeOrderButton: {
        marginTop: 20,
        backgroundColor: 'green',
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
        textAlign: 'center'
    },
})