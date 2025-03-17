import baseUrl from "./baseUrl";


//authentication
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


//contacts 
export const getContacts = async ()=>{
    try{
        const response = await baseUrl.get("/emergencycontacts")
        return response
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }
}


export const editContact = async (id,editValues,token)=>{
    try{
        const response = await baseUrl.put('/admin/editcontact',{id,editValues},
        {
            headers:{'Authorization':`Bearer ${token}`},
            withCredentials:true
        }
        )
        return response;
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }

}

export const deleteContact = async (id,token)=>{
    try{
        const response = await baseUrl.delete(`/admin/deleteContact/${id}`,
        {
            headers:{'Authorization':`Bearer ${token}`},
            withCredentials:true
        }
        )
        console.log("hi",response.status);
        
        return response
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }
}

export const addContact = async (name,number,token)=>{
    try{
        const response = await baseUrl.post('/admin/addcontact',{name,number},
        {
            headers:{'Authorization':`Bearer ${token}`},
            withCredentials:true
        }
        )
        console.log("testing",response.status);
        
        return response
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }
}

export const getAccessToken = async ()=>{
    try{
        const response = await baseUrl.get("/admin/refreshtoken")
        return response
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }
}

//reviews
export const getReviews = async (token)=>{
    try{
        const response = await baseUrl.get("/admin/reviews/getreviews",{
            withCredentials: true,
            headers:{'Authorization':`Bearer ${token}`}
        })

        
        return response
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }
}

export const deleteReview = async (reviewid,locationid,token)=>{

    try{
        const response = await baseUrl.delete(`/admin/reviews/deletereview/${locationid}/${reviewid}`,{
            withCredentials:true,
            headers:{'Authorization':`Bearer ${token}`}
        })
        return response;
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }
}

//users

export const addUser = async (formdata,token)=>{
    try{

        const response = await baseUrl.post('/admin/users/adduser',formdata,{
            withCredentials:true,
            headers:{'Authorization':`Bearer ${token}`}
        })

        return response

    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const getAllUser = async (token)=>{
    try{
        const response = await baseUrl.get('/admin/users',{
            withCredentials:true,
            headers:{'Authorization':`Bearer ${token}`}
        })
        return response
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const getUserById = async (id,token)=>{
    try{
        const response = await baseUrl.get(`/admin/users/${id}`,
        {
            withCredentials:true,
            headers:{'Authorization':`Bearer ${token}`}
        }
        )
        return response
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const editUser = async (id,formdata,token)=>{
    const {_id,visaStamp,passportCopy,password, ...otherDetails} = formdata
    console.log(otherDetails);
    
    try{
        const response = await baseUrl.put(`/admin/users/${id}`,{user:otherDetails},{
            withCredentials:true,
            headers:{'Authorization':`Bearer ${token}`}
        })
        return response
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const deleteUser = async (id,requestType,token)=>{
    try{
        const response = await baseUrl.delete(`/admin/users/${id}`,{
            data:{requestType},
            headers:{'Authorization':`Bearer ${token}`},
            withCredentials:true
        })
        return response
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}