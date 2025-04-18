import React,{useState,useContext} from 'react'
import { loginAdmin } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import  AuthContext  from '../context/AuthProvider';
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg,setErrmsg] = useState('');

  const {setUser} = useContext(AuthContext);


  
  const navigate = useNavigate();

  const handleLogin =async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await loginAdmin(username,password);
    setLoading(false)
    if(response.status === 200){
     setUser(response.data)
     navigate('/')
    }else{
    
      toast.error("Login Failed",{
        position:"top-right",
      });

    }

  }

  const toastMessage = (message)=>{
    toast.error(message);
  }

  // if(loading){
  //   return(
  //     <Loading message="Logging In"/>
 

  //   )
  // }

 


  return (
    <>
    <ToastContainer/>
    {loading?<Loading message="Logging In"/>:
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="username"
                type="text"
                placeholder={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           
                type='submit'
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 TourNepal. All rights reserved.
        </p>
      
      </div>
    </div>
}
    </>
  );
};



export default Login