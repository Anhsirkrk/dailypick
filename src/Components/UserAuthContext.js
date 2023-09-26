import React, { createContext, useState, useContext } from 'react';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginauthenticated, setIsLoginauthenticated] = useState(false); // Add this line
  console.log("userauthcintext",isLoginauthenticated);

  return (
    <UserAuthContext.Provider value={{ isLoginauthenticated, setIsLoginauthenticated }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useLoginAuth = () => {
  return useContext(UserAuthContext);
};
