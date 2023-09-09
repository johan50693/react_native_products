/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ProductsScreen = () => {

  const {products, loadProducts} = useContext(ProductsContext);

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
            >
              <Text style={styles.productName}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
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
