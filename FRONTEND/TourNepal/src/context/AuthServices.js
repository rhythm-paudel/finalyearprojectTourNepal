import { createContext } from "react";
import { refreshToken } from "../api/authService";
import { getToken } from "../utils/TokenStorage";

export const AuthCheck = createContext();

export const AuthServices = ({children})=>{
    
    //function for getting access token that will hit the another function in the api folder
    const getAccessToken = async ()=>{
        const encryptedToken =await getToken();
 
        const accessToken = await refreshToken(encryptedToken.encryptedToken);
        return accessToken;

    }

   
    return(
        //making the context globally available
        <AuthCheck.Provider value={{getAccessToken}}>
            {children}
        </AuthCheck.Provider>
    )
}