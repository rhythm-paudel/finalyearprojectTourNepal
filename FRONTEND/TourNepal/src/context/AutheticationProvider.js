import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect,createContext} from 'react'
import { getToken } from '../utils/TokenStorage';

export const AutheticationProviderContext = createContext();

const AutheticationProvider = ({children}) => {
    
    const [isAuthenticated,setIsAuthenticated] = useState(false); //for updating if any user is currently logged in
    const [isLoading, setIsLoading] = useState(true) //for spinning animation
    useEffect(()=>{
        const checkToken = async () =>{
            const tokens = await getToken();
            if(tokens && tokens.encryptedToken){
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }
            setIsLoading(false)
        };
        checkToken();
    },[])

  return (
    <AutheticationProviderContext.Provider value={{isAuthenticated,isLoading}}>
        {children}
    </AutheticationProviderContext.Provider>
  )
}

export default AutheticationProvider

const styles = StyleSheet.create({})