import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IPContext } from '../IPContext';


const Cart = ({ route, navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(route.params.userId);
    const [amount, setAmount] = useState(0);
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedItemRestaurants, setSelectedItemRestaurants] = useState([]);
    const [restaurant_id, setRestaurantId] = useState();
    const [selctedItemRestaurantId, setSelctedItemRestaurantId] = useState(null);
    const ipAddress = useContext(IPContext);

    useEffect(() => {
        async function getUserCart() {
            let result = await fetch('http://' + ipAddress.ipAddress + ':8000/api/getCart?userId=' + userId);
            result = await result.json();
            setCartItems(result);

        };
        getUserCart();
    }, [])

    useEffect(() => {
        if (cartItems.length > 0) {
            const newArray = cartItems.reduce((accumulator, item) => {
                const { restaurant_id, restaurant_name } = item;
                const restaurantExists = accumulator.some(
                    (restaurant) => restaurant.restaurant_id === restaurant_id
                );

                if (!restaurantExists) {
                    accumulator.push({ restaurant_id, restaurant_name });
                }

                return accumulator;
            }, []);

            setSelectedItemRestaurants(newArray);
        }
    }, [cartItems])

    useEffect(() => {
        if (cartItems.length > 0) {
            setCartItems((prevCartItems) =>
                prevCartItems.map((obj) => {
                    return { ...obj, selected: false };
                })
            );
        }
    }, [cartItems.length]);

    const increaseItem = async (itemId, price, serving_size_id) => {
        setSelectedItem((prevSelectedItem) =>
            prevSelectedItem.map((item) =>
                item.serving_size_id === serving_size_id ? { ...item, quantity: item.quantity < 10 ? parseInt(item.quantity) + 1 : item.quantity } : item
            )
        );
        selectedItem.map((item) => {
            if (item.serving_size_id === serving_size_id && item.quantity < 10) {
                let total = parseInt(amount) + parseInt(price);
                setAmount(total)
            }
        })
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity < 10 ? parseInt(item.quantity) + 1 : item.quantity, amount: item.quantity < 10 ? parseInt(item.amount) + parseInt(price) : item.amount } : item
            )
        );
    };

    const decreaseItem = async (itemId, price, serving_size_id) => {
        setSelectedItem((prevSelectedItem) =>
            prevSelectedItem.map((item) =>
                item.serving_size_id === serving_size_id ? { ...item, quantity: item.quantity > 1 ? parseInt(item.quantity) - 1 : item.quantity } : item
            )
        );
        selectedItem.map((item) => {
            if (item.serving_size_id === serving_size_id && item.quantity > 1) {
                let total = parseInt(amount) - parseInt(price);
                setAmount(total)
            }
        })
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity > 1 ? parseInt(item.quantity) - 1 : item.quantity, amount: item.quantity > 1 ? parseInt(item.amount) - parseInt(price) : item.amount } : item
            )
        );
    };

    useEffect(() => {
        console.log(selectedItem);
    }, [selectedItem])

    const toggleSelection = (itemId, price, isSelected, dish_id, restaurant_id, serving_size_id, quantity) => {
        if (selectedItem.length === 0) {
            setSelctedItemRestaurantId(restaurant_id);
            setCartItems((prevCartItems) =>
                prevCartItems.map((item) =>
                    item.id === itemId ? { ...item, selected: !item.selected } : item
                )
            );
            setSelectedItem((prevSelected) => {
                const index = prevSelected.findIndex((item) => item.dish_id === dish_id && item.serving_size_id === serving_size_id);

                if (index !== -1) {
                    // The dish_id exists, so remove it
                    prevSelected.splice(index, 1);
                } else {
                    // The dish_id does not exist, so add it
                    prevSelected.push({ dish_id: dish_id, serving_size_id: serving_size_id, quantity: quantity });
                }
                return [...prevSelected];
            });
            setRestaurantId({ id: restaurant_id });
            getTotalPrice(isSelected, price);
        }
        else if (selectedItem.length > 0 && selctedItemRestaurantId === restaurant_id) {
            setSelctedItemRestaurantId(restaurant_id);
            setCartItems((prevCartItems) =>
                prevCartItems.map((item) =>
                    item.id === itemId ? { ...item, selected: !item.selected } : item
                )
            );
            setSelectedItem((prevSelected) => {
                const index = prevSelected.findIndex((item) => item.dish_id === dish_id && item.serving_size_id === serving_size_id);

                if (index !== -1) {
                    // The dish_id exists, so remove it
                    prevSelected.splice(index, 1);
                } else {
                    // The dish_id does not exist, so add it
                    prevSelected.push({ dish_id: dish_id, serving_size_id: serving_size_id, quantity: quantity });
                }
                return [...prevSelected];
            });
            setRestaurantId({ id: restaurant_id });
            getTotalPrice(isSelected, price);
        }
        else {
            alert('please select only one restaurant dishes')
        }
    };
    const removeFromCart = (itemId) => {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
    };

    const getTotalPrice = (isSelected, price) => {
        if (isSelected) {
            let total = parseInt(amount) - parseInt(price);
            setAmount(total)
        }
        else {
            let total = parseInt(amount) + parseInt(price);
            setAmount(total)
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const checkout = () => {
        navigation.navigate('ScanQRCode', {
            dish_id: selectedItem,
            amount: amount,
            screen: 'cart',
            restaurant: restaurant_id,
        })
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name={'keyboard-backspace'} size={35} color="#FF8C00" />
                </TouchableOpacity>
                <Text style={styles.popularRestaurantsText}>Cart</Text>
            </View>
            <ScrollView>
                {
                    selectedItemRestaurants.map((restaurant, index) => (
                        <View key={index}>
                            <Text style={[styles.totalPrice, { paddingBottom: 5 }]}>{restaurant.restaurant_name}</Text>
                            {
                                cartItems.map((item) => (
                                    <View key={item.id}>
                                        {
                                            item.restaurant_id === restaurant.restaurant_id && (
                                                <TouchableOpacity
                                                    style={[styles.cartItem, { backgroundColor: item.selected ? '#FF8C00' : 'white' }]}
                                                    onPress={() => toggleSelection(item.id, item.amount, item.selected, item.dish_id, item.restaurant_id, item.serving_size_id, item.quantity)}
                                                >
                                                    <Text style={styles.itemName}>{item.dish_name}</Text>
                                                    <Text style={[styles.itemName, { fontWeight: 'bold', paddingLeft: 5 }]}>{item.serving_size}</Text>
                                                    <Text style={[styles.itemPrice, { paddingRight: 5 }]}>Rs-{item.amount}</Text>
                                                    <View style={styles.quantityContainer}>
                                                        <TouchableOpacity onPress={() => decreaseItem(item.id, item.price, item.serving_size_id)}>
                                                            <Text style={styles.quantityButton}>-</Text>
                                                        </TouchableOpacity>
                                                        <Text style={styles.quantity}>{item.quantity}</Text>
                                                        <TouchableOpacity >
                                                            <Text style={styles.quantityButton} onPress={() => increaseItem(item.id, item.price, item.serving_size_id)}>+</Text>
                                                        </TouchableOpacity>
                                                    </View>

                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                ))
                            }
                            {/* <FlatList
                            data={cartItems}
                            renderItem={()=>renderCartItem(restaurant.restaurant_id)}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.cartList}
                        /> */}
                        </View>
                    ))
                }
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={styles.footer}>
                    <Text style={styles.totalPrice}>Total:Rs.{amount}</Text>
                    <TouchableOpacity
                        onPress={checkout}
                        disabled={cartItems.every((item) => !item.selected)}
                        style={[styles.checkoutButton, { backgroundColor: cartItems.every((item) => !item.selected) ? '#AAA' : '#00C853' }]}
                    >
                        <Text style={styles.checkoutButtonText}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Dimensions.get('window').height * 0.04,
        paddingHorizontal: Dimensions.get('window').width * 0.03,
        position: 'relative'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get('window').width * 0.03,
        paddingBottom: Dimensions.get('window').height * 0.02,
        paddingTop: Dimensions.get('window').height * 0.02,
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
    footerContainer: {
        position: 'absolute',
        bottom: Dimensions.get('window').height * 0.02,
        width: '100%',
        paddingLeft: Dimensions.get('window').width * 0.03,

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
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    quantityButton: {
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: '#f0f0f0',
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#f0f0f0',
    },
});

export default Cart;
