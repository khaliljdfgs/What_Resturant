import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { IPContext } from '../IPContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';




export default function ScanQRCode({ route, navigation }) {
  const [restaurant, setRestaurant] = useState(route.params.restaurant);
  const [hasPermission, setHasPermission] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedItems, setSelectedItems] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const ipAddress = useContext(IPContext);

  const amount = route.params.amount;
  useEffect(() => {
    if (route.params.screen === 'profile') {
      setSelectedItems([{ dish_id: route.params.dish_id, serving_size_id: route.params.serving_size_id, quantity: 1 }])
    }
    else {
      setSelectedItems(route.params.dish_id)
    }
  }, [])


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://' + ipAddress.ipAddress + ':8000/api/userInfo?token=' + token)
          const result = await response.json();
          setUserId(result.id);
          console.log(result.id);
        } catch (error) {
          alert(error);
          // Handle login error, display an error message, etc.
        }
      }
    };
    checkToken();
  }, [])

  const handleScan = ({ type, data }) => {
    setScannedData(data);
    setScanned(true);
  };

  useEffect(() => {
    if (scanned) {
      placeOrder();
      // navigation.navigate('RestaurantProfile', {
      //   restaurant: restaurant
      // })
    }
  }, [scanned])

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems])



  const placeOrder = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('QR_value', scannedData);
    formData.append('restaurant_id', restaurant.id);
    // formData.append('date', '7-2-2023');
    formData.append('amount', amount);
    // formData.append('selectedItems', JSON.stringify(selectedItems));
    // Append selectedItems individually
    if (Array.isArray(selectedItems)) {
      selectedItems.forEach((item, index) => {
        formData.append(`selectedItems[${index}][dish_id]`, item.dish_id.toString());
        formData.append(`selectedItems[${index}][serving_size_id]`, item.serving_size_id.toString());
        formData.append(`selectedItems[${index}][quantity]`, item.quantity.toString());
      });
    }
    try {
      let response = await fetch('http://' + ipAddress.ipAddress + ':8000/api/placeOrder', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(errorResponse);
      }
      const successResponse = await response.json();
      alert(successResponse);
      await setDoc(doc(db, "restaurants", restaurant.id), {
        flag: true
      });
      if (route.params.screen === 'profile') {
        navigation.navigate('RestaurantProfile', {
          restaurant: restaurant,
        })
      }
      else {
        navigation.replace('Cart', {
          userId: userId,
        })
      }
    } catch (error) {
      alert(error);
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.scannerContainer}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleScan}
      />
      {
        route.params.screen === 'profile' ?
          <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.navigate('RestaurantProfile', {
            restaurant: restaurant
          })}>
            <MaterialIcons name={'keyboard-arrow-left'} size={40} color="#FF8C00" />
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.navigate('Cart', {
            userId: userId
          })}>
            <MaterialIcons name={'keyboard-arrow-left'} size={40} color="#FF8C00" />
          </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  data: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scannerContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
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
});
