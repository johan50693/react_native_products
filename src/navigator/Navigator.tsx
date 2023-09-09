/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React, {useContext} from 'react';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { Authcontext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { ProductsNavigator } from './ProductsNavigator';

const Stack = createStackNavigator();

export const Navigator = () => {

  const {status} = useContext(Authcontext);

  if (status === 'checking') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      {
        (status === 'authenticated')
        ? (
          <>
            <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
            <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
          </>
        )
        : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )

      }
    </Stack.Navigator>
  );
};
