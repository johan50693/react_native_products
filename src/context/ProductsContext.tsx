/* eslint-disable prettier/prettier */
import { createContext, useState } from 'react';
import { Producto, ProdutcsResponse } from '../interface/appInterfaces';
import React, {useEffect} from 'react';
import cafeApi from '../api/cafeApi';

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

  useEffect(() => {
    loadProducts();
  }, []);


  const loadProducts = async () => {

    const resp = await cafeApi.get<ProdutcsResponse>('/productos?limite=50');
    // setProducts([...products, ...resp.data.productos]);
    setProducts([...resp.data.productos]);


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