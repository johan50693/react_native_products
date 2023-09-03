/* eslint-disable prettier/prettier */
import React from 'react';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { Platform, Text, TextInput, View } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const LoginScreen = () => {
  return (
      <>
        {/* Background */}
          <Background />
        {/* Keyboard avoid view */}
          <View style={loginStyles.formContainer}>

            <WhiteLogo />

            <Text style={loginStyles.title}> Login</Text>

            <Text style={loginStyles.label}> Email:</Text>
            <TextInput
                placeholder="Ingrese su email"
                placeholderTextColor= "rgba(255,255,255,0.4)"
                keyboardType="email-address"
                underlineColorAndroid="white"
                style= {[
                  loginStyles.inputField,
                  (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                ]}
                selectionColor="white"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Text style={loginStyles.label}> Contraseña:</Text>
            <TextInput
                placeholder="******"
                placeholderTextColor= "rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                style= {[
                  loginStyles.inputField,
                  (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                ]}
                selectionColor="white"
                autoCapitalize="none"
                autoCorrect={false}
            />

            {/* Boton login */}
            <View style={loginStyles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={loginStyles.button}
                >
                  <Text style={loginStyles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Crear nueva cuenta */}
            <View style={loginStyles.newUserContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={ () => console.log('newUser')}
                >
                  <Text  style={loginStyles.buttonText}>Nueva Cuenta </Text>
                </TouchableOpacity>
            </View>
          </View>
      </>
  );
};
