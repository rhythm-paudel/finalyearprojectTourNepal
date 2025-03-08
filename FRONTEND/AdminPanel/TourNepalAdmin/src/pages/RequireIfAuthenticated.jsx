import { useContext,useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";


export const RequireIfAuthenticated = () => {



    const {user,loading} = useContext(AuthContext);

    if(loading){
        return(<Loading message="Please wait a while..."/>);
    }

    return user?  <Navigate to="/"/>:<Outlet />
}

