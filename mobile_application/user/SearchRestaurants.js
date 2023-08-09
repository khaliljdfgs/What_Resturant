import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { IPContext } from '../IPContext';
import Restaurants from './components/Restaurants';

const SearchRestaurants = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [showRestaurants, setShowRestaurants] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const inputRef = useRef(null);

    const ipAddress = useContext(IPContext);

    const handleSearch = (text) => {
        setSearchText(text.r_name);
        setShowRestaurants(true);
    };

    useEffect(() => {
        async function getSuggestions() {
            try {
                const response = await fetch('http://' + ipAddress.ipAddress + ':8000/api/restaurantSuggestion?inputValue=' + searchText);
                const result = await response.json();
                const uniqueSuggestions = result.filter((item, index, self) => self.findIndex(s => s.r_name === item.r_name) === index);
                setSuggestion(uniqueSuggestions);
                setRestaurants(result);
                setLoading(false);
                setNotFound(uniqueSuggestions.length === 0);
            } catch (error) {
                alert(error);
            }
        }

        if (searchText) {
            getSuggestions();
        } else {
            setSuggestion([]);
            setNotFound(false);
        }
    }, [searchText]);

    useEffect(() => {
        const focusTextInput = () => {
            inputRef.current.focus();
        };

        const unsubscribe = navigation.addListener('focus', focusTextInput);

        return unsubscribe;
    }, [navigation]);

    const handleInputChange = async (text) => {
        setSearchText(text);
        setLoading(true);
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name={'keyboard-backspace'} size={35} color="#FF8C00" />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={inputRef}
                        style={styles.forgotPasswordInput}
                        placeholder="Search for restaurants"
                        caretColor="#fff"
                        selectionColor="#FF8C00"
                        value={searchText}
                        onChangeText={handleInputChange}
                        onPressIn={() => setShowRestaurants(false)}
                    />
                    {loading ? (
                        <ActivityIndicator style={styles.loadingIndicator} size="small" color="#FF8C00" />
                    ) :
                        (
                            <TouchableOpacity style={styles.loadingIndicator} onPress={() => setSearchText('')}>
                                <MaterialIcons name={'cancel'} size={20} color="#b6b6b6" />
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
            <View style={{ borderTopWidth: 1, borderColor: '#ccc' }}></View>
            {searchText.length > 0 && !loading && !showRestaurants && (
                <View style={styles.suggestionContainer}>
                    {suggestion.length === 0 && !notFound && (
                        <ActivityIndicator style={styles.loadingIndicator} size="small" color="#FF8C00" />
                    )}
                    {suggestion.length === 0 && notFound && (
                        <Text style={styles.notFoundText}>No restaurants found</Text>
                    )}
                    {suggestion.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.suggestionItem}
                            onPress={() => handleSearch(item)}
                        >
                            <Text style={styles.suggestionText}>{item.r_name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {
                showRestaurants && restaurants.length>0 && (
                    <View style={styles.popularRestaurantsContainer}>
                        <Text style={styles.popularRestaurantsText}>Search for "{searchText}"</Text>
                        <ScrollView
                            contentContainerStyle={styles.carouselContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            {restaurants.map((data) => (
                                <TouchableOpacity key={data.id} style={styles.slide} onPress={()=>navigation.navigate('RestaurantProfile',{
                                   restaurant:data
                                })}>
                                    <Image source={{ uri: 'http://' + ipAddress.ipAddress + ':8000/' + data.logo }} style={styles.image} />
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.slideTitle}>{data.r_name}</Text>
                                        <Text style={styles.slideDescription}>{data.address}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>)
            }
        </View>
    );
};

export default SearchRestaurants;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Dimensions.get('window').height * 0.08,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.get('window').width * 0.04,
        paddingBottom: Dimensions.get('window').height * 0.04,
    },
    inputContainer: {
        width: '85%',
        position: 'relative',
    },
    forgotPasswordInput: {
        width: '100%',
        height: 40,
        borderWidth: 0,
        backgroundColor: '#cecece',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    leftbarButton: {
        paddingTop: 3,
    },
    searchIcon: {
        paddingHorizontal: 10,
    },
    loadingIndicator: {
        position: 'absolute',
        right: '2%',
        top: '20%',
        paddingHorizontal: 10,
    },
    suggestionContainer: {
        paddingHorizontal: Dimensions.get('window').width * 0.04,
        paddingTop: 10,
        marginTop: 10,
    },
    suggestionItem: {
        paddingVertical: 8,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
    },
    suggestionText: {
        paddingBottom: Dimensions.get('window').height * 0.02,
        fontSize: 16,
        color: '#000',
    },
    notFoundText: {
        paddingBottom: Dimensions.get('window').height * 0.02,
        fontSize: 16,
        color: '#b6b6b6',
        textAlign: 'center',
    },
    popularRestaurantsContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: windowHeight * 0.02,
        paddingHorizontal: windowWidth * 0.03,
        // paddingBottom:'3%'
    },
    popularRestaurantsText: {
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.02,
        marginHorizontal: windowWidth * 0.02,
    },
    carouselContainer: {
        // paddingVertical: windowHeight * 0.01,
    },
    slide: {
        width: windowWidth * 0.91,
        height: windowHeight * 0.25,
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
        paddingTop: '3%',
        paddingBottom: '3%',
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
});
