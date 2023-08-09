import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';


const ForgotPassowrd = ({navigation}) => {
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftbarButton} onPress={() => navigation.navigate('LoginScreen')}>
                <MaterialIcons name={'keyboard-backspace'} size={40} color="#FF8C00" />
            </TouchableOpacity>
            <View style={styles.forgotPasswordContainer}>
                {/* Implement Forgot Password functionality here */}
                <Text style={styles.forgotPasswordInstruction}>Enter your email to reset password</Text>
                <TextInput
                    style={styles.forgotPasswordInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TouchableOpacity style={styles.forgotPasswordButton}>
                    <Text style={styles.forgotPasswordButtonText}>Reset Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ForgotPassowrd

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:  Dimensions.get('window').height * 0.08 + 30,
        marginHorizontal: Dimensions.get('window').width * 0.04,
    },
    forgotPasswordContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    forgotPasswordInstruction: {
        fontSize: 16,
        marginBottom: 10,
    },
    forgotPasswordInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    forgotPasswordButton: {
        backgroundColor: '#FF8C00',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    forgotPasswordButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    leftbarButton: {
        position: 'absolute',
        top: 50,
        alignItems:'center',
        justifyContent:"center"
    },
    
})