/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductsScreen = ({navigation}:Props) => {

  const {products, loadProducts} = useContext(ProductsContext);
  const [refreshing, setRefreshing] = useState(false);

  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  useEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 10}}
          onPress={ () => navigation.navigate('ProductScreen',{})}
        >
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });

  }, []);

  return (
      <View style={{
        flex: 1,
        marginHorizontal: 10,
      }}>
          <FlatList
            data={products}
            keyExtractor={ (p) => p._id }
            renderItem={ ({item}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={
                  () => navigation.navigate('ProductScreen',{
                    id: item._id,
                    name: item.nombre,
                  })
                }
              >
                <Text style={styles.productName}>{item.nombre}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.itemSeparator} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={loadProductsFromBackend} />
            }
          />
      </View>
  );
};


const styles = StyleSheet.create({
    productName: {
      fontSize: 20,
    },
    itemSeparator: {
      borderBottomWidth: 5,
      marginVertical: 5,
      borderBottomColor: 'rgba(0,0,0,0.5)',
    },
});
