import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { IPContext } from '../../IPContext';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const PopularRestaurant = (props) => {
    const [restaurant, setRestaurant] = useState([]);
    const navigation = props.navigation;


    const ipAddress = useContext(IPContext);

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

    const renderRestaurantStars = (star) => {
        const rating = star;
        const filledStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

        const stars = [];
        for (let i = 0; i < filledStars; i++) {
            stars.push(<Ionicons key={i} name="star" size={10} color="#FF8C00" />);
        }
        if (hasHalfStar) {
            stars.push(<Ionicons key={filledStars} name="star-half" size={10} color="#FF8C00" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Ionicons key={filledStars + (hasHalfStar ? 1 : 0) + i} name="star-outline" size={10} color="#FF8C00" />);
        }
        return stars;
    };


    return (
        <View style={styles.popularRestaurantsContainer}>
            <Text style={styles.popularRestaurantsText}>Popular Restaurants</Text>
            <ScrollView
                horizontal
                contentContainerStyle={styles.carouselContainer}
                showsHorizontalScrollIndicator={false}
            >
                {restaurant.map((data) => (
                    <TouchableOpacity key={data.id} style={styles.slide} onPress={() => navigation.navigate('RestaurantProfile', {
                        restaurant: data
                    })}>
                        <Image source={{ uri: 'http://' + ipAddress.ipAddress + ':8000/' + data.logo }} style={styles.image} />
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.slideTitle}>{data.r_name}</Text>
                            <View style={styles.ratingContainer1}>
                            {renderRestaurantStars(data.avg_rating)}
                            <Text style={styles.slideDescription}>{data.address}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default PopularRestaurant;

const styles = StyleSheet.create({
    popularRestaurantsContainer: {
        backgroundColor: '#f5f5f5',
        paddingTop: windowHeight * 0.02,
        paddingHorizontal: windowWidth * 0.03,
    },
    popularRestaurantsText: {
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.02,
        marginHorizontal: windowWidth * 0.02,
    },
    carouselContainer: {
        paddingVertical: windowHeight * 0.01,
    },
    slide: {
        width: windowWidth * 0.58,
        height: windowHeight * 0.19,
        borderRadius: 10,
        marginHorizontal: windowWidth * 0.02,
    },
    image: {
        width: '100%',
        height: '80%',
        borderRadius: 10,
    },
    descriptionContainer: {
        flex: 1,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
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
        paddingLeft:5
    },
    ratingContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
      },
});
