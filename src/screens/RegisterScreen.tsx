/* eslint-disable prettier/prettier */
import React, { useContext, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hook/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { Authcontext } from '../context/AuthContext';

interface Props extends StackScreenProps<any,any> {}


export const RegisterScreen = ({navigation}:Props) => {

  const {errorMessage,removeError,signUp} = useContext(Authcontext);

  const {email, password, name, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    signUp({correo: email, nombre: name,password});
    Keyboard.dismiss();
  };

  useEffect(() => {

    if (errorMessage.length === 0) {return;}

    Alert.alert('Registro incorrecto', errorMessage, [{
      text: 'OK',
      onPress: removeError,
    }]);

  }, [errorMessage]);

  return (
    <>

        <KeyboardAvoidingView
          style={{flex:1 , backgroundColor: '#5856d6'}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Keyboard avoid view */}
          <View style={loginStyles.formContainer}>

            <WhiteLogo />

            <Text style={loginStyles.title}>Registro</Text>

            <Text style={loginStyles.label}> Nombre:</Text>
            <TextInput
                placeholder="Ingrese su nombre"
                placeholderTextColor= "rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                style= {[
                  loginStyles.inputField,
                  (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                ]}
                selectionColor="white"
                onChangeText={ (value) => onChange(value, 'name')}
                value={name}
                onSubmitEditing={onRegister}
                autoCapitalize="words"
                autoCorrect={false}
            />

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
                onChangeText={ (value) => onChange(value, 'email')}
                value={email}
                onSubmitEditing={onRegister}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Text style={loginStyles.label}> Contraseña:</Text>
            <TextInput
                placeholder="******"
                placeholderTextColor= "rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                secureTextEntry={true}
                style= {[
                  loginStyles.inputField,
                  (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                ]}
                selectionColor="white"
                onChangeText={ (value) => onChange(value, 'password')}
                value={password}
                onSubmitEditing={onRegister}
                autoCapitalize="none"
                autoCorrect={false}
            />

            {/* Boton login */}
            <View style={loginStyles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={loginStyles.button}
                  onPress={onRegister}
                >
                  <Text style={loginStyles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>
            </View>

            {/* Crear nueva cuenta */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={ () => navigation.replace('Loginscreen')}
              style= {loginStyles.buttonReturn}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    </>
);
};
