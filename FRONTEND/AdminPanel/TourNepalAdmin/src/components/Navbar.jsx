import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider';
import baseUrl from  "../api/baseUrl"
import { useNavigate } from 'react-router-dom';


const Navbar =  () =>{

  const {user,setUser} = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState('Home'); //for updating the view of current page in sidebar
  const navigate = useNavigate();
  const handleLogout=async ()=>{
    try{
    const response =await baseUrl.post('/admin/logout',{},{
      withCredentials: true
    });

    if(response?.status===200){
      setUser(null);
      navigate('/login');
    }
    
    }catch(e){
      console.log(e.message);
      
    }
  }

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-5 space-y-6">
      <div className="flex items-center space-x-3">
        <h2 className="text-2xl font-bold text-indigo-400">TourNepal Admin</h2>
      </div>

      <nav className="flex flex-col space-y-2 flex-1">
        <Link 
          to="/" 
          className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-indigo-400"
          onClick={() => setCurrentPage('Home')}
        >
          <svg className="w-5 h-5" fill="none" stroke={currentPage === 'Home' ? "blue" : "white"} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className={currentPage === 'Home' ? 'text-blue-600' : 'text-white-600'}>Home</span>
        </Link>

        {/* Users Link */}
        <Link 
          to="/users" 
          className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-indigo-400"
          onClick={() => setCurrentPage('Users')}
        >
          <svg className="w-5 h-5" fill="none" stroke={currentPage === 'Users' ? "blue" : "white"} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className={currentPage === 'Users' ? 'text-blue-600' : 'text-white-600'}>Users</span>
        </Link>

        {/* Emergency Contacts Link */}
        <Link 
          to="/emergencycontacts" 
          className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-indigo-400"
          onClick={() => setCurrentPage('Emergency Contacts')}
        >
          <svg className="w-5 h-5" fill="none" stroke={currentPage === 'Emergency Contacts' ? "blue" : "white"} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className={currentPage === 'Emergency Contacts' ? 'text-blue-600' : 'text-white-600'}>Emergency Contacts</span>
        </Link>

        {/* Reviews Link */}
        <Link 
          to="/reviews" 
          className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-indigo-400"
          onClick={() => setCurrentPage('Reviews')}
        >
          <svg className="w-5 h-5" fill="none" stroke={currentPage === 'Reviews' ? "blue" : "white"} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className={currentPage === 'Reviews' ? 'text-blue-600' : 'text-white-600'}>Reviews</span>
        </Link>

        {/* Admins Link */}
        <Link 
          to="/admins" 
          className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-indigo-400"
          onClick={() => setCurrentPage('Admins')}
        >
          <svg className="w-5 h-5" fill="none" stroke={currentPage === 'Admins' ? "blue" : "white"} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className={currentPage === 'Admins' ? 'text-blue-600' : 'text-white-600'}>Admins</span>
        </Link>

        <Link 
          to="/notifications" 
          className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-indigo-400"
          onClick={() => setCurrentPage('Notifications')}
        >
          <svg className="w-5 h-5" fill="none" stroke={currentPage === 'Notifications' ? "blue" : "white"} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
          </svg>
          <span className={currentPage === 'Notifications' ? 'text-blue-600' : 'text-white-600'}>Notifications</span>
        </Link>

        <Link 
          to="/login" 
          className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-indigo-400"
          onClick={handleLogout}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </Link>
      </nav>

      {/* Bottom section for user/profile */}
      <div className="border-t border-gray-800 pt-4">
        <div className="flex items-center space-x-3 hover:bg-gray-800 rounded-lg p-3 cursor-pointer transition-colors duration-300">
          <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
          <div>
            <p className="text-sm font-medium">{user.AdminDetail.username}</p>
            <p className="text-xs text-gray-400">{user.AdminDetail.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar