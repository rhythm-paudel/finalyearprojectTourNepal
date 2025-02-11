import baseUrl from "./baseUrl"

export const loginUser = async (email,password)=>{
    const LOGIN_URL = '/login';

    try{
        const response = await baseUrl.post(LOGIN_URL,
            JSON.stringify({email,password}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        
        return response;
    }catch(e){
        if(e.response){
            return e.response
        }
        return null;
    }
}


//function to check if the current user token has been expired or not
export const checkUserToken = async (encryptedToken)=>{
    const AUTH_CHECK = '/verifyJWT'

    try{
        const response = await baseUrl.post(AUTH_CHECK,{},{
            headers:{'Authorization':`Bearer ${encryptedToken}`}
        })

        return response;
    }catch(e){
        return null;
    }
}