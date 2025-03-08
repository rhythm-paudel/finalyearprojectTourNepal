import baseUrl from "./baseUrl";

export const loginAdmin = async (username,password) => {
    try{
        const response = await baseUrl.post("/admin/login",
            {
            username,
            password
        }, {
            withCredentials: true // Explicitly enable for this request
          });        
        return response;
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }
}

export const refreshToken = async () => {
    try{

        const response = await baseUrl.get("/admin/refreshtoken",{
            withCredentials: true
        });
        return response;

    }catch(e){
        console.log("error ma gayo")
        if(e.response){
            return e.response;
        }
        return null;
    }
}