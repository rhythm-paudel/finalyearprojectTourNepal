import { createContext, useContext } from "react";
import { loginUser } from "../api/authService";
import { registerUser,reuploadDocs } from "../api/authService";
import { decodedToken } from '../utils/decodeToken';
//importing context for setting user
import { AuthenticationProviderContext } from "./AuthenticationProvider";

//importing utils for token
import { getToken, storeTokens } from "../utils/TokenStorage";
import { androidNotificationToken, updateToken } from "../utils/userActions";

export const AuthContext = createContext();

export const DataProvider = ({children})=>{
  

    const {setCurrUser,getUserDetail,saveLocation} = useContext(AuthenticationProviderContext) //using context from authenticationprovider for setting current user
    const login = async (email,password)=>{
        const userData = await loginUser(email,password)
        if(userData && userData?.data.accessToken){
            //storing tokens securely
            await storeTokens(userData.data.accessToken,userData.data.encryptedToken)
            const details = await getUserDetail();
            setCurrUser(details.data); //setting the user session if the token is validated
           
        
            const notificationToken = await androidNotificationToken();
            await saveLocation();
   
            
            const response = await updateToken(notificationToken,userData.data.accessToken);
         
            if(response?.status===200){
                console.log("token updated");
            }else{
           
                console.log("token not updated");
            }
       
            
            
        }
        return userData;
    }

  

    //function to call after user registers
    const register = async (formData)=>{
        const response = await registerUser(formData);
        return response;
    }

    //function to reupload documents
    const reuploadDocuments = async(formData)=>
    {
        console.log(formData);
        const formattedData = {
            passportCopy: formData.passport,
            visaStamp: formData.visa}
        const token =await getToken();
        const response = await reuploadDocs(formattedData,token.accessToken);
     
        
        return response;
    }

    return(
        <AuthContext.Provider value={{login,register,reuploadDocuments}}>

            {children}

        </AuthContext.Provider>
    )
}

