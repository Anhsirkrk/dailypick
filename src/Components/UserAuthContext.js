import React, { createContext, useState, useContext } from 'react';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserAuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useLoginAuth = () => {
  return useContext(UserAuthContext);
};
