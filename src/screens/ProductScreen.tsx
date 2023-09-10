/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({route,navigation}: Props) => {

  const {id,name} = route.params;

  useEffect(() => {

    navigation.setOptions({
      title: (name) ? name : 'Nuevo Producto',
    });
  }, []);


  return (
      <View>
        <Text> {id} </Text>
        <Text> {name} </Text>
      </View>
  );
};
