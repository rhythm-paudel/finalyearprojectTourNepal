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


//function to send new user data to backedn
export const registerUser = async (formData)=>{
    const REGISTER_URL = '/register'

    try{
        //formdata is not sent directly because backend expects different naming
        const response = await baseUrl.post(REGISTER_URL,JSON.stringify({email:formData.email,password:formData.password,
                                                                         firstname:formData.firstname, lastname:formData.lastname,
                                                                         dateOfBirth:formData.dob,visaStamp:formData.visa,passportCopy:
                                                                         formData.passport,dateOfEntry:formData.dateOfEntry,
                                                                         nationality:formData.nationality,intendedDays:formData.intendedDays
        }),{
            headers: { 'Content-Type': 'application/json' },
                withCredentials: true
        })
        return response
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }
}

//reuploading user documents
export const reuploadDocs = async (formData,token)=>{
    const UPLOAD_DOCS = '/reUploadDocs'

    try{
        const response = await baseUrl.put(UPLOAD_DOCS,formData,
            {
            headers:{'Authorization':`Bearer ${token}`},
            withCredentials:true
        })
        return response;
    }catch(e){
        if(e.response){
            return e.response;
        }
        return null;
    }
}

//function for feteching userDetails
export const fetchUserDetails = async (accessToken)=>{
    
    const USER_DETAILS = '/userDetail'

    try{
        const response = await baseUrl.get(USER_DETAILS,{
            headers:{'Authorization':`Bearer ${accessToken}`}
        })
        return response
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}


//function for getting new access token
export const refreshToken = async (refreshToken)=>{
    const REFRESH_TOKEN = '/refresh'

 

    try{
        const response = await baseUrl.post(REFRESH_TOKEN,JSON.stringify({encryptedToken:refreshToken}),{
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true
        })

        return response;
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const getNearbyPlaces = async (locationDetails)=>{
    const NEARBY_PLACES = '/location'
    const location = locationDetails.location;
    const radius = locationDetails.radius;
    const destinationType = locationDetails.destinationType;
    try{
        const response = await baseUrl.post(NEARBY_PLACES,JSON.stringify({location,radius,destinationType}),{
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true
        })
        return response;
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const postComment = async (locationDetails,commentBody,accessToken,name)=>{
    const POST_COMMENT = "/postComments";
   
    
    const requestBody = {
        "location": locationDetails.location,
        "commentBody": commentBody,
        "name":name
      };
   
    try{
        const response = await baseUrl.post(POST_COMMENT,requestBody,
                                            {
                                                headers:{'Authorization':`Bearer ${accessToken}`},
                                                withCredentials:true
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

export const updateComment = async (data,token)=>{
    const UPDATE_COMMENT = "/postComments/update"
    try{
        const response = await baseUrl.put(UPDATE_COMMENT,data,
                                            {
                                                headers:{'Authorization':`Bearer ${token}`},
                                                withCredentials:true
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

export const removeComment = async (data,token) =>{
    const REMOVE_COMMENT = "/postComments/delete"
    try{
        const response = await baseUrl.delete(REMOVE_COMMENT,{
            headers: {'Authorization': `Bearer ${token}`},
            data: data, 
            withCredentials: true
          })
        return response
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const getPlaceReviews = async (lat,lng)=>{
    const GET_REVIEWS = "/getReviews"

    try{
        
        const response = await baseUrl.get(GET_REVIEWS,{
            params:{
                lat:lat,
                lng:lng
            }
        })
        return response
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const getContacts = async ()=>{
    const GET_CONTACTS = "/emergencycontacts"

    try{
        const response = await baseUrl.get(GET_CONTACTS)
        return response
    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const deleteRequest = async (token)=>{
    const DELETE_REQUEST = "/userDetail/updateUser"

    
    try{
        const response = await baseUrl.put(DELETE_REQUEST,{"deletionRequest":true},{
            headers:{'Authorization':`Bearer ${token}`},
            withCredentials:true
        })
       
        
        return response;

    }catch(e){
        if(e.response){
            return e.response
        }
        return null
    }
}

export const  updateTokenNotification = async(notificationToken,token)=>{
    const UPDATE_TOKEN = "/userDetail/updateUser"

    try{
     
        
        const response = await baseUrl.put(UPDATE_TOKEN,{"notificationToken":notificationToken},{
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
};


export const getNotifications = async (token)=>{
    const GET_NOTIFICATIONS = "/userDetail/getNotifications"

    try{
        const response = await baseUrl.get(GET_NOTIFICATIONS,{
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

export const updateEmail = async (email,token)=>{
    const UPDATE_EMAIL = "/userDetail/updateUser"

    try{
        const response = await baseUrl.put(UPDATE_EMAIL,{"updatedEmail":email},{
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