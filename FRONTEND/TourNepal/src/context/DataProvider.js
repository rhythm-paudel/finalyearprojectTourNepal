import { createContext, useContext } from "react";
import { loginUser } from "../api/authService";
import { registerUser } from "../api/authService";
import { decodedToken } from '../utils/decodeToken';
//importing context for setting user
import { AuthenticationProviderContext } from "./AuthenticationProvider";

//importing utils for token
import { storeTokens } from "../utils/TokenStorage";

export const AuthContext = createContext();

export const DataProvider = ({children})=>{
  

    const {setCurrUser} = useContext(AuthenticationProviderContext) //using context from authenticationprovider for setting current user
    const login = async (email,password)=>{
        const userData = await loginUser(email,password)
        if(userData && userData?.data.accessToken){
            //storing tokens securely
            await storeTokens(userData.data.accessToken,userData.data.encryptedToken)
            let accessToken = decodedToken(userData.data.accessToken)
            console.log(accessToken);
            
            setCurrUser(accessToken)
        }
        return userData;
    }

    //function to call after user registers
    const register = async (formData)=>{
        const response = await registerUser(formData);
        return response;
    }
    return(
        <AuthContext.Provider value={{login,register}}>

            {children}

        </AuthContext.Provider>
    )
}

