/* eslint-disable prettier/prettier */
import React, {createContext, useEffect, useReducer} from 'react';
import { LoginData, LoginResponse, Usuario } from '../interface/appInterfaces';
import { AuthState, authReducer } from './authReducer';
import cafeApi from '../api/cafeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthcontextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (LoginData:LoginData) => void;
  logOut: () => void;
  signIn: (LoginData:LoginData) => void;
  removeError: () => void;
}

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const Authcontext = createContext({} as AuthcontextProps);

export const AuthProvider = ({children}:any) => {

  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {

    checkToken();

  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {return dispatch({type: 'notAuthenticated'});}

    const resp = await  cafeApi.get('/auth');

    if (resp.status !== 200){
      return dispatch({type: 'notAuthenticated'});
    }

    await AsyncStorage.setItem('token', resp.data.token);

    dispatch({
      type: 'signIUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario},
    });

  };

  const signUp = () => {

  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };

  const signIn = async ({correo, password}:LoginData) => {

    try {
      const {data: {token,usuario}} = await cafeApi.post<LoginResponse>('/auth/login',{correo,password});
      dispatch({
        type: 'signIUp',
        payload: {
          token,
          user: usuario},
      });

      await AsyncStorage.setItem('token', token);

    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Informnación incorrecta',
      });
    }
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <Authcontext.Provider value={{
      ...state,
      signUp,
      logOut,
      signIn,
      removeError,
    }}>
      {children}
    </Authcontext.Provider>
  );
};
