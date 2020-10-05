import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect
  } from 'react';
  import AsyncStorage from '@react-native-community/async-storage';
  
  import api from '../services/api';
  
  
  const AuthContext = createContext({});
  
  const AuthProvider = ({ children }) => {
    const [data, setData] = useState({});
  
    useEffect(() => {
      async function loadData() {
        const user = await AsyncStorage.getItem('@YOURCHOICE:user');
        // console.log("AuthProvider user", user);
  
        if(user){
          setData(JSON.parse(user))
        }
      }
  
      loadData();
    }, [])
  
    const signUp = useCallback(async ({ email, password }) => {

        try{
            await AsyncStorage.setItem('@YOURCHOICE:user', JSON.stringify({email, password}));
            setData({ email, password });
        }catch(error){
            console.log(error);
        }

    }, []);
  
    const signOut = useCallback(async () => {
      await AsyncStorage.removeItem('@YOURCHOICE:user');
  
      setData({});
    }, []);
  
    return (
      <AuthContext.Provider
        value={{ data, signUp, signOut }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  }
  
  export { AuthProvider, useAuth };