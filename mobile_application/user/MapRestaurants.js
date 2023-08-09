import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useContext } from 'react';
import { IPContext } from '../IPContext';
import { MaterialIcons } from '@expo/vector-icons';
import MarkerImage from "../assets/maker.png"



const MapRestaurants = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [restaurant, setRestaurant] = useState([]);
    const ipAddress = useContext(IPContext);
    const [loading, setLoading] = useState(true);



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
            setLoading(false);
        })();
    }, [])
    // useEffect(() => {
    //     console.warn(restaurant)
    // }, [restaurant])

    const handleMarkerDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setCurrentLocation({ latitude, longitude });
    };

    useEffect(() => {
        if (currentLocation) {
            async function getData() {
                let result = await fetch('http://' + ipAddress.ipAddress + ':8000/api/cityRestaurant?longitude=' + currentLocation.longitude + '&latitude=' + currentLocation.latitude);
                result = await result.json();
                setRestaurant(result);
            }
            getData();
        }
    }, [currentLocation]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FF8C00" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {currentLocation && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsCompass={false}
                >
                    <Marker coordinate={currentLocation} title="Your Location" draggable={true}
                        onDragEnd={handleMarkerDragEnd} />
                    {restaurant.map((data) => (
                        <Marker
                            coordinate={{
                                latitude: data.location_latitude,
                                longitude: data.location_longitude,
                            }}
                            title={data.r_name}
                            key={data.id}
                        >
                            <Image
                                source={MarkerImage} // Replace with the path to your marker image file
                                style={{ width: 40, height: 40 }}
                            />
                        </Marker>
                    ))}
                </MapView>
            )}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {
                    restaurant.map((data) => (
                        <View style={styles.car}>
                            <Image source={{ uri: 'http://' + ipAddress.ipAddress + ':8000/' + data.logo }} style={styles.image} />
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.slideTitle}>{data.r_name}</Text>
                                <Text style={styles.slideDescription}>{data.address}</Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
            <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.navigate('Home')}>
                <MaterialIcons name={'keyboard-arrow-left'} size={40} color="#FF8C00" />
            </TouchableOpacity>
        </View>
    );
};

export default MapRestaurants;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    scrollView: {
        position: 'absolute',
        bottom: 50,
    },
    car: {
        marginHorizontal: windowWidth * 0.08,
        width: windowWidth * 0.75,
        height: windowHeight * 0.19,
        marginRight: 10,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
    },
    image: {
        width: '99%',
        height: '75%',
        borderRadius: 10,
    },
    descriptionContainer: {
        flex: 1,
        borderBottomRightRadius: 10,
        paddingTop: '3%'
    },
    slideTitle: {
        fontSize: windowWidth * 0.04,
        fontWeight: 'bold',
        color: '#000',
    },
    slideDescription: {
        fontSize: windowWidth * 0.03,
        color: '#666',
    },
    leftbarButton: {
        position: 'absolute',
        left: Dimensions.get('window').height * 0.02,
        top: 50,
        backgroundColor: '#fff',
        borderRadius: 50,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
