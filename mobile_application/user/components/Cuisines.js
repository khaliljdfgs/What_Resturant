import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { IPContext } from '../../IPContext';
import { TouchableOpacity } from 'react-native';

const Cuisines = (props) => {
    const [category, setCategory] = useState([]);
    const navigation = props.navigation;


    const ipAddress = useContext(IPContext);

    useEffect(() => {
        async function getCategory() {
            try {
                let result = await fetch('http://' + ipAddress.ipAddress + ':8000/api/all_dish_categories')
                result = await result.json();
                setCategory(result);
            }
            catch (error) {
                alert(error);
            }
        }
        getCategory();
    }, [])
    return (
        <View style={styles.cuisinesContainer}>
            <Text style={styles.cuisinesText}>Cuisines</Text>
            <ScrollView
                horizontal
                contentContainerStyle={styles.cuisinesScrollView}
                showsHorizontalScrollIndicator={false}
            >
                {category.map((cuisine, index) => (
                    index % 2 === 0 && (
                        <View key={cuisine.id} style={styles.cuisineRow}>
                            <TouchableOpacity style={styles.cuisineCard} onPress={()=>navigation.navigate('CuisineRestaurants',{
                                category_id:cuisine.id,
                                name:cuisine.name
                            })}>
                                <Image source={{ uri: 'http://' + ipAddress.ipAddress + ':8000/' + cuisine.image }} style={styles.image} />
                                <Text style={styles.cuisineTitle}>{cuisine.name}</Text>
                            </TouchableOpacity>
                            {category[index + 1] && (
                                <TouchableOpacity style={styles.cuisineCard} onPress={()=>navigation.navigate('CuisineRestaurants',{
                                    category_id:category[index + 1].id,
                                    name:category[index + 1].name
                                })}>
                                    <Image source={{ uri: 'http://' + ipAddress.ipAddress + ':8000/' + category[index + 1].image }} style={styles.image} />
                                    <Text style={styles.cuisineTitle}>{category[index + 1].name}</Text>

                                </TouchableOpacity>
                            )}
                        </View>
                    )
                ))}
            </ScrollView>
        </View>
    )
}

export default Cuisines

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    cuisinesContainer: {
        paddingHorizontal: windowWidth * 0.03,
        marginTop: windowHeight * 0.02,
    },
    cuisinesText: {
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.01,
        marginHorizontal: windowWidth * 0.02,
    },
    cuisinesScrollView: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cuisineCard: {
        width: windowWidth * 0.2,
        height: windowHeight * 0.09,
        // backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: windowHeight * 0.02,
        marginRight: windowWidth * 0.02,
        marginHorizontal: windowWidth * 0.02,
    },
    image: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain'
    },
    cuisineTitle: {
        fontSize: windowWidth * 0.03,
        fontWeight: 'bold',
        color: '#000',
        padding: 5
    },
})