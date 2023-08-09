import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { IPContext } from '../IPContext';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';


const CuisineRestaurants = ({ route, navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const category_id = route.params.category_id;
  const ipAddress = useContext(IPContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://' + ipAddress.ipAddress + ':8000/api/cuisineRestaurant?category_id=' + category_id);
        const result = await response.json();
        setRestaurants(result);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name={'keyboard-backspace'} size={35} color="#FF8C00" />
        </TouchableOpacity>
          <Text style={styles.popularRestaurantsText}>{route.params.name}</Text>
      </View>
      <View style={styles.popularRestaurantsContainer}>
        <ScrollView
          contentContainerStyle={styles.carouselContainer}
          showsVerticalScrollIndicator={false}
        >
          {restaurants.map((data) => (
            <TouchableOpacity key={data.id} style={styles.slide} onPress={() => navigation.navigate('RestaurantProfile', {
              restaurant: data
            })}>
              <Image source={{ uri: 'http://' + ipAddress.ipAddress + ':8000/' + data.logo }} style={styles.image} />
              <View style={styles.descriptionContainer}>
                <Text style={styles.slideTitle}>{data.r_name}</Text>
                <Text style={styles.slideDescription}>{data.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default CuisineRestaurants

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Dimensions.get('window').height * 0.04,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingBottom: Dimensions.get('window').height * 0.02,
    paddingTop: Dimensions.get('window').height * 0.02,
  },
  leftbarButton: {
    paddingTop: 3,
  },
  popularRestaurantsContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: windowWidth * 0.03,
    // paddingBottom:'3%'
  },
  popularRestaurantsText: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    marginLeft:15
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
})