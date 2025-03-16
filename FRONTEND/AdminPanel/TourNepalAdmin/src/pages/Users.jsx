import React, { useEffect, useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllUser,getAccessToken } from '../api/authService';
import AuthContext from '../context/AuthProvider';
import { deleteUser } from '../api/authService';

const Users = () => {
  const [deletingUser, setDeletingUser] = useState(null);
  const {user,setUser} = useContext(AuthContext);
  // Static user data
  const [users, setUsers] = useState([
    {
      _id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      deletionRequest: 'Pending',
      verificationStatus: 'Complete',
      passportCopy:"xyz",
      visaStamp:"xyz",
      dateOfEntry:"",
      nationality:"CA",
      intendedDays:20,
      dateOfBirth:""
    },
    {
      _id: 2,
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane@example.com',
      deletionRequest: 'None',
      verificationStatus: 'Incomplete',
      passportCopy:"xyz",
      visaStamp:"xyz",
      dateOfEntry:"",
      nationality:"CA",
      intendedDays:20,
      dateOfBirth:""
    },
    {
      _id: 3,
      firstname: 'Bob',
      lastname: 'Johnson',
      email: 'bob@example.com',
      deletionRequest: 'Pending',
      verificationStatus: 'Complete',
      passportCopy:"xyz",
      visaStamp:"xyz",
      dateOfEntry:"",
      nationality:"CA",
      intendedDays:20,
      dateOfBirth:""
    },
    {
      _id: 4,
      firstname: 'Alice',
      lastname: 'Williams',
      email: 'alice@example.com',
      deletionRequest: 'None',
      verificationStatus: 'Incomplete',
      passportCopy:"xyz",
      visaStamp:"xyz",
      dateOfEntry:"",
      nationality:"CA",
      intendedDays:20,
      dateOfBirth:""
    },
    {
      _id: 5,
      firstname: 'Charlie',
      lastname: 'Brown',
      email: 'charlie@example.com',
      deletionRequest: 'Pending',
      verificationStatus: 'Complete',
      passportCopy:"xyz",
      visaStamp:"xyz",
      dateOfEntry:"",
      nationality:"CA",
      intendedDays:20,
      dateOfBirth:""
    },
    {
      _id: 6,
      firstname: 'Eva',
      lastname: 'Davis',
      email: 'eva@example.com',
      deletionRequest: 'None',
      verificationStatus: 'Incomplete',
      passportCopy:"xyz",
      visaStamp:"xyz",
      dateOfEntry:"",
      nationality:"CA",
      intendedDays:20,
      dateOfBirth:""
    },
    {
      _id: 7,
      firstname: 'Frank',
      lastname: 'Miller',
      email: 'frank@example.com',
      deletionRequest: 'Pending',
      verificationStatus: 'Complete',
      passportCopy:"xyz",
      visaStamp:"xyz",
      dateOfEntry:"",
      nationality:"CA",
      intendedDays:20,
      dateOfBirth:""
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete =async (_id) => {
    const response = await deleteUser(_id,true,user.accessToken);
    if(response?.status===200){
      window.alert('User deleted successfully!');
    }else if(response?.status===202){
      //will show popup saying request rejected
      window.alert('Deletion request rejected');
    }else if(response?.status===403){
      const newToken = await getAccessToken();
      if(newToken?.status==200){
        setUser(newToken.data);
        const response = await deleteUser(_id,decision,newToken.data.accessToken);
        if(response?.status===200){
          window.alert('User deleted successfully!');
        }else if(response?.status===202){
          //will show popup saying request rejected
          window.alert('Deletion request rejected');
        }
      }else if(newToken.status===403){
        setUser(null);
      }
    }
    setUsers(users.filter(user => user._id !== _id));
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);


  //initial render for loading users
  useEffect(()=>{
    const fetchUsers = async ()=>{  
      const users = await getAllUser(user.accessToken);
      if(users?.status===200){
        setUsers(users.data)
      }else if (users?.status===403){        
        const newToken = await getAccessToken();
        if(newToken?.status==200){
          setUser(newToken.data);
          const users = await getAllUser(newToken.data.accessToken);
          if(users?.status===200){
            setUsers(users.data)
          }
        }else if(newToken.status===403){
          setUser(null);
        }
      }
  
     
      
    }

    fetchUsers();
  },[])

  return (
    <div className="p-6 bg-white-900 min-h-screen text-white">

      {deletingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  handleDelete(deletingUser);
                  setDeletingUser(null);
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setDeletingUser(null)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-400">Users Management</h1>
          <Link to={`/users/adduser`} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            Add User
          </Link>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-800 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries
            </span>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-800">
          <table className="w-full">
            <thead className="bg-blue-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">First Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Last Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Deletion Request</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Doc Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {currentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-800 hover:text-white transition-colors group"
                >
                  <td className="px-6 py-4 group-hover:text-white text-black">{user.firstname}</td>
                  <td className="px-6 py-4 group-hover:text-white text-black">{user.lastname}</td>
                  <td className="px-6 py-4 group-hover:text-white text-black">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${user.deletionRequest
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                      {user.deletionRequest?"True":"False"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${user.verificationStatus === 'verified'
                        ? 'bg-green-500/20 text-green-500' : user.verificationStatus === 'pending'? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-red-500/20 text-red-500'
                      }`}>
                      {user.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <Link
                      to={`/users/edit/${user._id}`}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeletingUser(user._id)}  // Updated this line
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-gray-400">
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-indigo-600 text-white">
              {currentPage}
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 rounded bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;