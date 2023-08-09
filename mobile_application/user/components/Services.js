import { StyleSheet, Text, View, Dimensions, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { IPContext } from '../../IPContext';

const Services = (props) => {
  const [cities, setCities] = useState([]);
  const navigation = props.navigation;


  const ipaddress = useContext(IPContext);

  useEffect(() => {
    async function getData() {
      try {
        let result = await fetch('http://' + ipaddress.ipAddress + ':8000/api/cities');
        result = await result.json();
        setCities(result);
      } catch (error) {
        alert(error)
      }
    }
    getData();
  }, [])
  return (
    <View style={styles.additionalContainer}>
      <Text style={styles.additionalText}>Popular Cities</Text>
      <View style={styles.additionalCardContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            cities.map((city, index) => (
              index % 2 === 0 && (
                <>
                  <ImageBackground
                    source={{ uri: 'http://' + ipaddress.ipAddress + ':8000/' + city.image }}
                    style={styles.additionalCard}
                    imageStyle={styles.cardImage}
                  >
                    <TouchableOpacity onPress={() => navigation.navigate('CityRestaurant',{
                      name:city.city_name.charAt(0).toUpperCase() + city.city_name.slice(1),
                      latitude:city.latitude,
                      longitude:city.longitude
                    })}>
                      <Text style={styles.additionalTitle}>{city.city_name.charAt(0).toUpperCase() + city.city_name.slice(1)}</Text>
                    </TouchableOpacity>
                  </ImageBackground>

                  {cities[index + 1] && (
                    <ImageBackground
                      source={{ uri: 'http://' + ipaddress.ipAddress + ':8000/' + cities[index + 1].image }}
                      style={styles.additionalCard}
                      imageStyle={styles.cardImage}
                    >
                      <TouchableOpacity onPress={() => navigation.navigate('CityRestaurant',{
                        name:cities[index + 1].city_name.charAt(0).toUpperCase() + cities[index + 1].city_name.slice(1),
                        latitude:cities[index + 1].latitude,
                        longitude:cities[index + 1].longitude
                      })}>
                        <Text style={styles.additionalTitle}>{cities[index + 1].city_name.charAt(0).toUpperCase() + cities[index + 1].city_name.slice(1)}</Text>
                      </TouchableOpacity>
                    </ImageBackground>
                  )}
                </>
              )
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
};

export default Services;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  additionalContainer: {
    paddingHorizontal: windowWidth * 0.03,
    marginTop: windowHeight * 0.02,
  },
  additionalText: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.02,
  },
  additionalCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight * 0.02,
  },
  additionalCard: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.2,
    marginHorizontal: windowWidth * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    resizeMode: 'cover',
  },
  additionalTitle: {
    backgroundColor: '#FF8C00',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: '#fff',
  },
});
