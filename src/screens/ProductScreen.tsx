/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({route,navigation}: Props) => {

  const {id,name} = route.params;
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {

    navigation.setOptions({
      title: (name) ? name : 'Nuevo Producto',
    });
  }, []);


  return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>Nombre del producto:</Text>
          <TextInput
            placeholder="Producto"
            style= {styles.textInput}

          />

          {/* Selector / Pcker */}
          <Text style={styles.label}>Categoria:</Text>

          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>

          <Button
            title="Guardar"
            onPress={ () => {}}
            color="#5856d6"
          />

          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}} >
            <Button
              title="Cámara"
              onPress={ () => {}}
              color="#5856d6"
            />

            <View style={{width: 10}} />

            <Button
              title="Galeria"
              onPress={ () => {}}
              color="#5856d6"
            />
          </View>

        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      marginTop: 10,
      marginHorizontal: 20,
    },
    label: {
      fontSize: 18,
    },
    textInput: {
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      borderColor: 'rgba(0,0,0,0.2)',
      height: 45,
      marginTop: 5,
      marginBottom: 15,
    },
});
