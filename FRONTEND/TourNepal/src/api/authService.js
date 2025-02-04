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