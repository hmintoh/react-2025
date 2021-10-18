import React, { useState, useContext, createContext, ReactNode } from 'react';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from 'firebase/auth';
import { firebase } from 'lib/firebase';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(undefined);
  const auth = getAuth(firebase);
  const provider = new GithubAuthProvider();

  const signInWithGithub = () => {
    signInWithPopup(auth, provider).then((res) => {
      setUser(res.user);
    });
  };

  const signout = () => {
    signOut(auth).then(() => {
      setUser(undefined);
    });
  };

  return (
    <AuthContext.Provider value={{ signInWithGithub, signout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
