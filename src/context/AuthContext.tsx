/* eslint-disable prettier/prettier */
import React, {createContext} from 'react';
import { Usuario } from '../interface/appInterfaces';

type AuthcontextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: () => void;
  signIn: () => void;
  removeError: () => void;
}

export const Authcontext = createContext({} as AuthcontextProps);

export const AuthProvider = ({children}:any) => {

  return (
    <Authcontext.Provider value={{

    }}>
      {children}
    </Authcontext.Provider>
  );
};
