import { StyleSheet, Text, View } from 'react-native';
import Home from './user/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { IPProvider } from './IPContext';
import MapRestaurants from './user/MapRestaurants';
import LoginScreen from './user/LoginScreen';
import ForgotPassowrd from './user/ForgotPassowrd';
import SearchRestaurants from './user/SearchRestaurants';
import RestaurantProfile from './user/RestaurantProfile';
import ScanQRCode from './user/ScanQRCode';
import CuisineRestaurants from './user/CuisineRestaurants';
import Cart from './user/Cart';
import Ratings from './user/Ratings';
import CityRestaurant from './user/CityRestaurant';

export default function App() {
  const Stack = createStackNavigator()
  return (
    <View style={styles.container}>
      <StatusBar/>
      <IPProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{header:()=>null  }} />
          <Stack.Screen name="Cart" component={Cart} options={{header:()=>null  }} />
          <Stack.Screen name="Ratings" component={Ratings} options={{header:()=>null  }} />
          <Stack.Screen name="MapRestaurants" component={MapRestaurants} options={{header:()=>null  }} />
          <Stack.Screen name="CityRestaurant" component={CityRestaurant} options={{header:()=>null  }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{header:()=>null  }} />
          <Stack.Screen name="ForgetPassword" component={ForgotPassowrd} options={{header:()=>null  }} />
          <Stack.Screen name="CuisineRestaurants" component={CuisineRestaurants} options={{header:()=>null  }} />
          <Stack.Screen name="SearchRestaurant" component={SearchRestaurants} options={{header:()=>null  }} />
          <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} options={{header:()=>null  }} />
          <Stack.Screen name="ScanQRCode" component={ScanQRCode} options={{header:()=>null  }} />
          {/* <Stack.Screen name="Restaurants" component={Restaurants} options={{header:()=>null  }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      </IPProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
