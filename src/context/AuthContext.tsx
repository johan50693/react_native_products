/* eslint-disable prettier/prettier */
import React, {createContext, useReducer} from 'react';
import { LoginData, LoginResponse, Usuario } from '../interface/appInterfaces';
import { AuthState, authReducer } from './authReducer';
import cafeApi from '../api/cafeApi';

type AuthcontextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (LoginData:LoginData) => void;
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

  const signUp = () => {

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

    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const removeError = () => {

  };

  return (
    <Authcontext.Provider value={{
      ...state,
      signUp,
      signIn,
      removeError,
    }}>
      {children}
    </Authcontext.Provider>
  );
};
