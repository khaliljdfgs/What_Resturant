import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { IPContext } from '../IPContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const LoginScreen = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [deviceToken, setDeviceToken] = useState('');
    const [userId, setUserId] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const ipaddress = useContext(IPContext);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setShowForgotPassword(false); // Reset the state when option changes
    };
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://' + ipaddress.ipAddress + ':8000/api/userInfo?token=' + token)
                    const result = await response.json();
                    setUserId(result.id);
                } catch (error) {
                    alert(error);
                    // Handle login error, display an error message, etc.
                }
            }
        };
        checkToken();
        if (userId && deviceToken) {
            sendDeviceToken();
        }
    }, [deviceToken, userId])

    const sendDeviceToken = async () => {
        let result = await fetch('http://' + ipaddress.ipAddress + ':8000/api/submitDeviceToken?userId=' + userId + '&deviceToken=' + deviceToken);
        result = await result.json();
        console.log(result);
        navigation.replace('Home');
    }

    const requestPushNotificationPermission = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus === 'granted') {
            // Get the device token (Expo Push Token)
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            setDeviceToken(token);
            // Store the token in your backend database for sending push notifications
        } else {
            console.log('Notification permission denied.');
            // Handle permission denied case
        }
    };

    const handleLogin = async () => {
        const item = { email, password };
        try {
            const response = await fetch('http://' + ipaddress.ipAddress + ':8000/api/login', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const result = await response.json();

            // Storing the token
            if (result.token) {
                const token = result.token;
                await AsyncStorage.setItem('token', token);
                requestPushNotificationPermission();
            }
            else if (result.error)
                (
                    alert(result.error)
                )
        } catch (error) {
            alert(error);
            // Handle login error, display an error message, etc.
        }
    };
    const handleRegister = async () => {
        const item = { name, email, password };
        try {
            const response = await fetch('http://' + ipaddress.ipAddress + ':8000/api/register', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const result = await response.json();
            if (result.token) {
                const token = result.token;
                await AsyncStorage.setItem('token', token);
                navigation.replace('Home');
            }
            else {
                alert(result.message)
            }
        } catch (error) {
            alert(error);
            // Handle login error, display an error message, etc.
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.navigate('Home')}>
                <MaterialIcons name={'keyboard-backspace'} size={40} color="#FF8C00" />
            </TouchableOpacity>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50%'
                }}>
                    <Image source={{ uri: 'http://' + ipaddress.ipAddress + ':8000/restaurants/ovmXRQoIpukCfSmnsjDyClNeJhoir5X59mRxayG9.png' }} alt="WhatRestaurant" style={styles.logo} />
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            style={[styles.optionButton, selectedOption === 'login' && styles.selectedOptionButton]}
                            onPress={() => handleOptionChange('login')}
                        >
                            <Text style={[styles.optionText, selectedOption === 'login' && styles.selectedOptionText]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, selectedOption === 'register' && styles.selectedOptionButton]}
                            onPress={() => handleOptionChange('register')}
                        >
                            <Text style={[styles.optionText, selectedOption === 'register' && styles.selectedOptionText]}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                    {selectedOption === 'register' && (
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />

                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                            <Ionicons
                                name={isPasswordVisible ? 'eye-off' : 'eye'}
                                size={24}
                                color="#ccc"
                                style={styles.passwordIcon}
                            />
                        </TouchableWithoutFeedback>
                    </View>

                    {selectedOption === 'login' && (
                        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={selectedOption === 'login' ? handleLogin : handleRegister}
                    >
                        <Text style={styles.buttonText}>{selectedOption === 'login' ? 'Login' : 'SignUp'}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: windowWidth * 0.04,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    leftbarButton: {
        position: 'absolute',
        left: 0,
        top: 50,
        alignItems: 'center',
        justifyContent: "center"
    },

    optionsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    optionButton: {
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#ccc',
    },
    selectedOptionButton: {
        borderBottomWidth: 2,
        borderColor: '#FF8C00',
    },
    optionText: {
        fontSize: 16,
    },
    selectedOptionText: {
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    passwordInputContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    passwordInput: {
        flex: 1,
    },
    passwordIcon: {
        marginLeft: 10,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#FF8C00',
        marginBottom: 10,
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#FF8C00',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
