import { createContext, useState } from "react";
import { loginUser } from "../api/authService";

//importing utils for token
import { storeTokens } from "../utils/TokenStorage";

export const AuthContext = createContext();

export const DataProvider = ({children})=>{
    const [currUser,setCurrUser] = useState();

    const login = async (email,password)=>{
        const userData = await loginUser(email,password)
        if(userData && userData.data.accessToken){
            //storing tokens securely
            await storeTokens(userData.data.accessToken,userData.data.encryptedToken)
        }
        return userData;
    }
    return(
        <AuthContext.Provider value={{currUser,login}}>

            {children}

        </AuthContext.Provider>
    )
}

