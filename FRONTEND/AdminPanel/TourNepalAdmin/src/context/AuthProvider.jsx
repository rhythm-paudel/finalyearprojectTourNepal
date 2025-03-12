import { createContext, useState,useEffect } from "react";
import { refreshToken } from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading]= useState(true);

    useEffect(() => {
        const getToken =async () => {
            setLoading(true)
            const token = await refreshToken();
            if(token.status === 200){
                setUser(token.data)
        
                
            }else{
                setUser(null);
            }
            setLoading(false);
        }
        getToken();

        
    },[])
    


    return (
    <AuthContext.Provider value={{user, setUser,loading}}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthContext

