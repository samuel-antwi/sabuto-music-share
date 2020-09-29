import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';

export const UserAuthContext = createContext();

const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <UserAuthContext.Provider value={{ user }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
