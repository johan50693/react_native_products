/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';
import { useCategories } from '../hook/useCategories';
import { useForm } from '../hook/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({route,navigation}: Props) => {

  const {id = '', name = ''} = route.params;
  const {categories,isLoading} = useCategories();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const {loadProductById} = useContext(ProductsContext);

  const {_id,categoriaId,nombre,img,form, onChange, setFormValue} = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {

    navigation.setOptions({
      title: (name) ? name : 'Nuevo Producto',
    });
  }, []);

  useEffect(() => {
    loadProduct();
  }, []);


  const loadProduct = async () => {

    if (id.length === 0) {return;}
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      nombre: name,
      img: product.img || '',
    });
  };

  return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>Nombre del producto:</Text>
          <TextInput
            placeholder="Producto"
            style= {styles.textInput}
            value={name}
            onChangeText={ (value) => onChange(value,'nombre')}
          />

          {/* Selector / Pcker */}
          <Text style={styles.label}>Categoria:</Text>

          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>

              {
                categories.map( (c) => (
                  <Picker.Item
                    label={c.nombre}
                    value={c.nombre}
                    key={c._id}
                  />
                ))
              }

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

          <Text>
              {JSON.stringify(form,null,2)}
          </Text>

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
