import { createContext } from "react";
import { fetchUserDetails,refreshToken } from "../api/authService";
import { getToken, storeTokens } from "../utils/TokenStorage";

export const AuthCheck = createContext();

export const AuthServices = ({children})=>{
    
    //function for getting access token that will hit the another function in the api folder
    const getAccessToken = async ()=>{
        const encryptedToken =await getToken();
 
        const accessToken = await refreshToken(encryptedToken.encryptedToken);
        return accessToken;

    }

    //function for getting user details 
    const getUserDetail = async ()=>{
        let encryptedToken =await getToken();
        const response = await fetchUserDetails(encryptedToken.accessToken);
        if(response?.status===403){ //if the current access token is expired
    
            const accessToken = await getAccessToken(); //requesting new accessToken
            if(accessToken?.status===200){
                storeTokens(accessToken.data.accessToken,encryptedToken.encryptedToken);
                encryptedToken = await getToken();
                const newResponse = await fetchUserDetails(encryptedToken.accessToken); //re-requesting user details
                return newResponse;
            }else{ //incase if the refresh token is also expired
          
                return response;
            }
        }
        
        return response;
    }
    return(
        //making the context globally available
        <AuthCheck.Provider value={{getAccessToken,getUserDetail}}>
            {children}
        </AuthCheck.Provider>
    )
}