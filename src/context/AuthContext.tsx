/* eslint-disable prettier/prettier */
import React, {createContext, useReducer} from 'react';
import { Usuario } from '../interface/appInterfaces';
import { AuthState, authReducer } from './authReducer';

type AuthcontextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: () => void;
  signIn: () => void;
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

  const signIn = () => {

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
