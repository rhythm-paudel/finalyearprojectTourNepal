import { createContext, useState } from "react";
import { loginUser } from "../api/authService";
export const AuthContext = createContext();

export const DataProvider = ({children})=>{
    const [currUser,setCurrUser] = useState();

    const login = async (email,password)=>{
        const userData = await loginUser(email,password)
        return userData;
    }
    return(
        <AuthContext.Provider value={{currUser,login}}>

            {children}

        </AuthContext.Provider>
    )
}

