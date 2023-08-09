import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Badge } from 'react-native-elements';
import { IPContext } from '../../IPContext';


const Header = (props) => {
    const accessToken = 'pk.eyJ1Ijoic2hhbmkzMiIsImEiOiJjbGl2enFsdHMwbmMyM2pvMmhjamFocW4zIn0.qn7A21vSUGbMhTefdH5iYg';
    const navigation = props.navigation;
    const userId = props.userId;
    const [showSidebar, setShowSidebar] = useState(false);
    const [auth, setAuth] = useState(false);
    const [totalCarts, setCart] = useState(null);
    const [address, setAddress] = useState(null);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const sidebarTranslateX = useState(new Animated.Value(-windowWidth))[0];

    const ipAddress = useContext(IPContext);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
        Animated.timing(sidebarTranslateX, {
            toValue: showSidebar ? -windowWidth : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    setAuth(true);
                }
            } catch (error) {
                console.log('Error retrieving token:', error);
            }
        };
        checkToken();
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://' + ipAddress.ipAddress + ':8000/api/getCartsNumber?userId=' + userId);
                const result = await response.json();
                setCart(result.totalCarts);
            } catch (error) {
                alert(error);
            }
        };
        if (auth) {
            fetchData();
        }
    }, [auth,navigation])
    useEffect(() => {
        function getAddress() {
            const apiKey = 'pk.eyJ1Ijoic2hhbmkzMiIsImEiOiJjbGl2enFsdHMwbmMyM2pvMmhjamFocW4zIn0.qn7A21vSUGbMhTefdH5iYg'; // Replace with your Mapbox API access token
            const latitudeDelta = 0.0922;
            const longitudeDelta = 0.0421;
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.longitude},${props.latitude}.json?access_token=${apiKey}&bbox=${props.longitude - longitudeDelta},${props.latitude - latitudeDelta},${props.longitude + longitudeDelta},${props.latitude + latitudeDelta}`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    // Extract the city name from the response
                    const cityName = data.features[0].text;
                    setAddress(cityName);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        if (props.latitude) {
            getAddress();

        }
    }, [props.latitude, props.longitude]);
    const handleLogout = async () => {
        // Remove the token from AsyncStorage
        await AsyncStorage.removeItem('token');
        setAuth(false);
        navigation.replace('Home')
    };
    const handleCart = () => {
        navigation.navigate('Cart', {
            userId: userId
        })
    };
    return (
        <View style={styles.container}>
            <>
                {showSidebar && (
                    <TouchableOpacity
                        onPress={toggleSidebar}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: Dimensions.get('window').width * 0.8,
                            height: Dimensions.get('window').height * 1,
                            width: Dimensions.get('window').width * 0.2,
                        }}
                    />
                )}
            </>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleSidebar} style={styles.sidebarButton}>
                    <MaterialIcons name={showSidebar ? '' : 'menu'} size={24} color="#fff" />
                </TouchableOpacity>
                {
                    !showSidebar && (
                        <TouchableOpacity style={styles.locationButton}>
                            <Text style={styles.headerText}>{address}</Text>
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity onPress={showSidebar ? toggleSidebar : handleCart} style={styles.leftbarButton}>
                    <MaterialIcons name={showSidebar ? 'menu' : 'add-shopping-cart'} size={24} color="#fff" />
                    {
                        !showSidebar && totalCarts !== 0 && totalCarts !== null && (
                            <Badge value={totalCarts} status="success" containerStyle={styles.cartBadge} />
                        )
                    }
                </TouchableOpacity>
                <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarTranslateX }] }]}>
                    {/* Sidebar content */}
                    <View>
                        <TouchableOpacity style={styles.sidebarItem}>
                            <MaterialIcons name="settings" size={24} color="#000" />
                            <Text style={styles.sidebarItemText}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sidebarItem}>
                            <MaterialIcons name="help" size={24} color="#000" />
                            <Text style={styles.sidebarItemText}>Help Center</Text>
                        </TouchableOpacity>
                        {
                            auth && (
                                <>
                                    <TouchableOpacity style={styles.sidebarItem}>
                                        <MaterialIcons name="account-circle" size={24} color="#000" />
                                        <Text style={styles.sidebarItemText}>Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Ratings')}>
                                        <MaterialIcons name="star" size={24} color="#000" />
                                        <Text style={styles.sidebarItemText}>Give Ratings</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </View>
                    <View style={{ paddingVertical: 50 }}>
                        <View style={{ borderTopWidth: 1, borderColor: '#ccc' }}>
                            {
                                auth === true ? (
                                    <TouchableOpacity style={styles.sidebarItem} onPress={handleLogout}>
                                        <MaterialIcons name="logout" size={24} color="#000" />
                                        <Text style={styles.sidebarItemText}>Log Out</Text>
                                    </TouchableOpacity>
                                )
                                    :
                                    (
                                        <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('LoginScreen')}>
                                            <MaterialIcons name="person-add" size={24} color="#000" />
                                            <Text style={styles.sidebarItemText}>Log In/Sign Up</Text>
                                        </TouchableOpacity>
                                    )
                            }

                        </View>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.08 + 30,
        backgroundColor: '#FF8C00',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    sidebarButton: {
        position: 'absolute',
        left: Dimensions.get('window').height * 0.02,
        top: '70%',
        transform: [{ translateY: -10 }], // Adjust the vertical position
    },
    locationButton: {
        position: 'absolute',
        left: Dimensions.get('window').height * 0.07,
        top: '60%',
    },
    leftbarButton: {
        position: 'absolute',
        right: Dimensions.get('window').height * 0.02,
        top: '70%',
        transform: [{ translateY: -10 }], // Adjust the vertical position
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    sidebar: {
        position: 'absolute',
        top: '80%',
        left: 0,
        height: Dimensions.get('window').height * 0.91,
        width: Dimensions.get('window').width * 0.8, // Adjust the width of the sidebar as per your requirement
        backgroundColor: '#FF8C00',
        elevation: 4,
        zIndex: 1,
        justifyContent: 'space-between',
    },
    sidebarItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    sidebarItemText: {
        fontSize: 15,
        color: '#000',
        marginLeft: 12,
    },
    cartBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
    },
});
