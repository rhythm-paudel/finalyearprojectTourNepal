import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  // Static user data
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      deletionRequest: 'Pending',
      docStatus: 'Complete'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      deletionRequest: 'None',
      docStatus: 'Incomplete'
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      deletionRequest: 'Pending',
      docStatus: 'Complete'
    },
    {
      id: 4,
      firstName: 'Alice',
      lastName: 'Williams',
      email: 'alice@example.com',
      deletionRequest: 'None',
      docStatus: 'Incomplete'
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie@example.com',
      deletionRequest: 'Pending',
      docStatus: 'Complete'
    },
    {
      id: 6,
      firstName: 'Eva',
      lastName: 'Davis',
      email: 'eva@example.com',
      deletionRequest: 'None',
      docStatus: 'Incomplete'
    },
    {
      id: 7,
      firstName: 'Frank',
      lastName: 'Miller',
      email: 'frank@example.com',
      deletionRequest: 'Pending',
      docStatus: 'Complete'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
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

  return (
    <div className="p-6 bg-white-900 min-h-screen text-white">
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
                  key={user.id} 
                  className="hover:bg-gray-800 hover:text-white transition-colors group"
                >
                  <td className="px-6 py-4 group-hover:text-white text-black">{user.firstName}</td>
                  <td className="px-6 py-4 group-hover:text-white text-black">{user.lastName}</td>
                  <td className="px-6 py-4 group-hover:text-white text-black">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.deletionRequest === 'Pending' 
                        ? 'bg-yellow-500/20 text-yellow-500' 
                        : 'bg-green-500/20 text-green-500'
                    }`}>
                      {user.deletionRequest}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.docStatus === 'Complete' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {user.docStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <Link 
                      to={`/users/edit/${user.id}`}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
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