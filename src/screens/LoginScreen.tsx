/* eslint-disable prettier/prettier */
import React from 'react';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { Text, TextInput } from 'react-native';
import { loginStyles } from '../theme/loginTheme';

export const LoginScreen = () => {
  return (
      <>
        {/* Background */}
          <Background />
        {/* Keyboard avoid view */}
          <WhiteLogo />

          <Text style={loginStyles.title}> Login</Text>
          <Text style={loginStyles.label}> Email:</Text>
          <TextInput
              placeholder="Ingrese su email"
              placeholderTextColor= "rgba(255,255,255,0.4)"
              keyboardType="email-address"
          />
      </>
  );
};
