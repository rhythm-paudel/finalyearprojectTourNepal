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
                                                                         formData.passport
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

export const postComment = async (locationDetails,commentBody,accessToken)=>{
    const POST_COMMENT = "/postComments";
    console.log(locationDetails);
    
    const requestBody = {
        "location": locationDetails.location,
        "commentBody": commentBody
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


