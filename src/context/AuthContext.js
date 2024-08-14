import React, {createContext, useState, useContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
