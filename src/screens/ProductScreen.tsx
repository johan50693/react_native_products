/* eslint-disable prettier/prettier */
import React, {useEffect, useContext, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';
import { useCategories } from '../hook/useCategories';
import { useForm } from '../hook/useForm';
import { ProductsContext } from '../context/ProductsContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({route,navigation}: Props) => {

  const {id = '', name = ''} = route.params;
  const [tempUri, setTempUri] = useState<string>('');
  const {categories} = useCategories();
  const {loadProductById,addProduct,updateProduct,uploadImage} = useContext(ProductsContext);

  const {_id,categoriaId,nombre,img,form, onChange, setFormValue} = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {

    navigation.setOptions({
      title: (nombre) ? nombre : 'Sin nombre de Producto',
    });
  }, [nombre]);

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

  const saveOrUpdate = async () => {
    if (id.length > 0){
      updateProduct(categoriaId,nombre,_id);
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId,nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5,
    }, (resp) => {
      if (resp.didCancel) {return;}
      if (!resp.assets[0].uri) {return;}

      setTempUri(resp.assets[0].uri);
      uploadImage(resp,_id);
    });
  };

  const takePhotoFromGalery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    }, (resp) => {
      if (resp.didCancel) {return;}
      if (!resp.assets[0].uri) {return;}

      setTempUri(resp.assets[0].uri);
      uploadImage(resp,_id);
    });
  };

  return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>Nombre del producto:</Text>
          <TextInput
            placeholder="Producto"
            style= {styles.textInput}
            value={nombre}
            onChangeText={ (value) => onChange(value,'nombre')}
          />

          {/* Selector / Pcker */}
          <Text style={styles.label}>Categoria:</Text>

          <Picker
            selectedValue={categoriaId}
            onValueChange={(itemValue) => onChange(itemValue,'categoriaId') }>

              {
                categories.map( (c) => (
                  <Picker.Item
                    label={c.nombre}
                    value={c._id}
                    key={c._id}
                  />
                ))
              }

          </Picker>

          <Button
            title="Guardar"
            onPress={saveOrUpdate}
            color="#5856d6"
          />

          {
            (_id.length > 0) && (
              <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}} >
                <Button
                  title="Cámara"
                  onPress={takePhoto}
                  color="#5856d6"
                />

                <View style={{width: 10}} />

                <Button
                  title="Galeria"
                  onPress={takePhotoFromGalery}
                  color="#5856d6"
                />
              </View>
            )
          }

          {
            (img.length > 0 && !tempUri) && (

              <Image
                source={{uri: img}}
                style={{
                  width: '100%',
                  height: 300,
                  marginTop: 20,
                }}
              />
            )
          }

          {
            (tempUri.length > 0 ) && (

              <Image
                source={{uri: tempUri}}
                style={{
                  width: '100%',
                  height: 300,
                  marginTop: 20,
                }}
              />
            )
          }

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
