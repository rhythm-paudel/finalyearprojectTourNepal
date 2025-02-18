import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect,createContext} from 'react'
import { getToken } from '../utils/TokenStorage';
import { checkUserToken } from '../api/authService';
import { decodedToken } from '../utils/decodeToken';

export const AuthenticationProviderContext = createContext();




const AuthenticationProvider = ({children}) => {
    const [currUser,setCurrUser] = useState({}); //for maintaining user session throughout the application
    const [isAuthenticated,setIsAuthenticated] = useState(false); //for updating if any user is currently logged in
    const [isLoading, setIsLoading] = useState(false) //for spinning animation
    useEffect(()=>{
        const checkToken = async () =>{
            setIsLoading(true);
            const tokens = await getToken();
           
            if(tokens && tokens.encryptedToken && tokens.accessToken){
        
                const response =await checkUserToken(tokens.encryptedToken) //waiting for response from the backend
       
                if(response?.status===200){
                    let accessToken = decodedToken(tokens.accessToken)
                    setCurrUser(accessToken) //setting the user session if the token is validated
                
                    setIsAuthenticated(true); 
         
                }
                //if the access token is not 200 then everything else is set to false
                else{
           
                    setIsAuthenticated(false)
                }
         
            }else{
                setIsLoading(false)
                setIsAuthenticated(false);
            }
            setIsLoading(false)
        };
        checkToken();
    },[])

  return (
    //setting required context value in globally in order to make changes
    <AuthenticationProviderContext.Provider value={{isAuthenticated,isLoading,currUser,setCurrUser,setIsAuthenticated}}>
        {children}
    </AuthenticationProviderContext.Provider>
  )
}

export default AuthenticationProvider

const styles = StyleSheet.create({})


