/* eslint-disable prettier/prettier */
import { createContext, useState } from 'react';
import { Producto } from '../interface/appInterfaces';
import React from 'react';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId:string, productName: string) => Promise<void>;
  updateProduct: (categoryId:string, productName: string, productId: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
}

export const ProductsContext = createContext( {} as ProductsContextProps);

export const ProductsProvider = ({children}:any) => {

  const [products, setProducts] = useState<Producto[]>([]);

  const loadProducts = async () => {

  };

  const addProduct = async () => {

  };

  const updateProduct = async () => {

  };

  const deleteProduct = async () => {

  };

  const loadProductById = async () => {
    throw new Error('error');
  };

  const uploadImage = async () => {

  };

  return (
    <ProductsContext.Provider value= {{
      products,
      loadProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      loadProductById,
      uploadImage,
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
