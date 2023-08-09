import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Animated, StatusBar, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Header from './components/Header';
import PopularRestaurant from './components/PopularRestaurant';
import Cuisines from './components/Cuisines';
import Services from './components/Services';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { IPContext } from '../IPContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MarkerImage from "../assets/maker.png"


const Home = ({ navigation }) => {

    const ipaddress = useContext(IPContext);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [restaurants, setRestaurant] = useState([]);
    const [latitude, setlatitude] = useState(null);
    const [longitude, setlongitude] = useState(null);
    const searchContainerOpacity = useRef(new Animated.Value(1)).current;
    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

    const ipAddress = useContext(IPContext);




    useEffect(() => {
        (async () => {
            // Request permission to access the device's location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            // Get the current location
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            console.log(location.coords.latitude);
            console.log(location.coords.longitude)
        })();
    }, []);

    useEffect(() => {
        if (currentLocation) {
            setlongitude(currentLocation.longitude);
            setlatitude(currentLocation.latitude);
        }
    }, [currentLocation])

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://' + ipaddress.ipAddress + ':8000/api/userInfo?token=' + token)
                    const result = await response.json();
                    setUserName(result.name);
                    setUserEmail(result.email);
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
        const fetchData = async () => {
            try {
                const response = await fetch('http://' + ipAddress.ipAddress + ':8000/api/allrestaurants');
                const result = await response.json();
                setRestaurant(result);
            } catch (error) {
                alert(error);
            }
        };
        fetchData();
    }, []);

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        scrollOffsetY.setValue(offsetY);

        // Hide/show the search container based on scrolling direction
        if (offsetY > 0) {
            Animated.timing(searchContainerOpacity, {
                toValue: 0,
                duration: 5,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(searchContainerOpacity, {
                toValue: 1,
                duration: 5,
                useNativeDriver: true,
            }).start();
        }
    };

    const getContentPaddingTop = () => {
        // Calculate the padding top of the content container based on the scroll position
        return scrollOffsetY.interpolate({
            inputRange: [0, 1],
            outputRange: [windowHeight * 0.08 + 90, windowHeight * 0.08 + 30],
            extrapolate: 'clamp',
        });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header navigation={navigation} userName={userName} userId={userId} longitude={longitude} latitude={latitude} />
            <Animated.View style={[styles.content, { paddingTop: getContentPaddingTop() }]}>
                <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
                    {/* Map */}
                    <View style={styles.mapContainer}>
                        {currentLocation && (
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: currentLocation.latitude,
                                    longitude: currentLocation.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker coordinate={currentLocation} title="Your Location" />
                                {
                                    restaurants.map((restaurant) => (
                                        <Marker
                                            coordinate={{
                                                latitude: restaurant.location_latitude,
                                                longitude: restaurant.location_longitude,
                                            }}
                                            title={restaurant.r_name}
                                            key={restaurant.id}
                                        >
                                            <Image
                                                source={MarkerImage} // Replace with the path to your marker image file
                                                style={{ width: 40, height: 40 }}
                                            />
                                        </Marker>
                                    ))
                                }
                            </MapView>
                        )}
                        {/* Button at bottom right */}
                        <TouchableOpacity style={styles.bottomRightButton} onPress={() => navigation.navigate('MapRestaurants', {
                            longitude: currentLocation.latitude,
                            latitude: currentLocation.latitude,
                        })} disabled={!currentLocation} >
                            <Text style={styles.buttonText}>Show map</Text>
                        </TouchableOpacity>

                        {/* Text at bottom left */}
                        <View style={styles.bottomLeftTextContainer}>
                            <Text style={styles.bottomLeftText}>Explore restaurants</Text>
                            <Text style={styles.bottomLeftText}>around you</Text>
                        </View>
                    </View>
                    {/* Popular Restaurants and Carousel */}
                    <PopularRestaurant navigation={navigation} />
                    {/* Cuisines */}
                    <Cuisines navigation={navigation} />
                    {/* Services */}
                    <Services navigation={navigation} />
                </ScrollView>
            </Animated.View>
            {/* Search bar container */}
            <Animated.View style={[styles.searchContainer, { opacity: searchContainerOpacity }]}>
                <TouchableOpacity style={styles.searchButtonContainer} onPress={() => navigation.navigate('SearchRestaurant')}>
                    <MaterialIcons style={styles.searchIcon} name={'search'} size={24} color="#ccc" />
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    content: {
        paddingTop: windowHeight * 0.08 + 90, // Add padding to create space below the header
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'
    },
    mapContainer: {
        height: windowHeight * 0.25,
        backgroundColor: '#e0e0e0',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bottomRightButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FF8C00',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    bottomLeftTextContainer: {
        position: 'absolute',
        bottom: 15,
        left: 20,
        padding: 10,
    },
    bottomLeftText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    searchContainer: {
        position: 'absolute',
        top: windowHeight * 0.08 + 30, // Position the search container below the header
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#FF8C00',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    searchBarContainer: {
        width: '95%', marginHorizontal: Dimensions.get('window').width * 0.02, borderRadius: 20, overflow: 'hidden'
    },
    searchBar: {
        width: '100%',
        // paddingHorizontal: 10,
        borderWidth: 0,
        borderRadius: 10,
        fontSize: 16,
        elevation: 2,
        height: 40,
        backgroundColor: '#fff'
    },
    searchButtonContainer: {
        position: 'relative',
        width: '95%',
        marginHorizontal: 10,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
        height: '65%'
    },
    searchButtonText: {
        position: 'absolute',
        top: '27%',
        left: '15%',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ccc',
    },
    searchIcon: {
        position: 'absolute',
        top: '25%',
        left: '5%',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
});

export default Home;
