import { jwtDecode } from 'jwt-decode';


//for decoding token stored in local device for retreiving basic information of the user
export const decodedToken = (accessToken)=>{
    const  userData = jwtDecode(accessToken)
    const decodedUserData = {
        firstname:userData.UserDetails.firstname,
        lastname:userData.UserDetails.lastname,
        dateOfBirth:userData.UserDetails.dateOfBirth,
        email:userData.UserDetails.email,
        verificationStatus:userData.UserDetails.verificationStatus==="verified"?true:false,
    }
    return decodedUserData
}

