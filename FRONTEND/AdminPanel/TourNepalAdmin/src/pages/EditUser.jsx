import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // Static user data as of now
  const [user, setUser] = useState({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    dateOfBirth: '1990-01-01',
    nationality: 'American',
    dateOfEntry: '2023-01-01',
    indentedDaysOfStays: 30,
    deletionRequest: 'Pending',
    docStatus: 'Pending',
    visaCopy: 'https://via.placeholder.com/150',
    passportCopy: 'https://via.placeholder.com/150'
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  // Handle document approval
  const handleDocApproval = (status) => {
    setUser(prev => ({ ...prev, docStatus: status }));
  };

  // Handle deletion
  const handleDeletionDecision = (decision) => {
    setUser(prev => ({ ...prev, deletionRequest: decision }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/users');
  };

  return (
    <div className="p-6 bg-white-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-400">Edit User</h1>
          <Link to="/users" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
            Back to Users
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={user.dateOfBirth}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={user.nationality}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date of Entry</label>
                <input
                  type="date"
                  name="dateOfEntry"
                  value={user.dateOfEntry}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Indented Days of Stays</label>
                <input
                  type="number"
                  name="indentedDaysOfStays"
                  value={user.indentedDaysOfStays}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Document Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400">Document Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Visa Copy</h3>
                <img src={user.visaCopy} alt="Visa" className="w-full h-48 object-contain rounded" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Passport Copy</h3>
                <img src={user.passportCopy} alt="Passport" className="w-full h-48 object-contain rounded" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Document Status:</span>
              <select
                value={user.docStatus}
                onChange={(e) => handleDocApproval(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Deletion Request Section */}
          {user.deletionRequest === 'Pending' && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-indigo-400">Deletion Request</h2>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleDeletionDecision('Approved')}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Approve Deletion
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletionDecision('Rejected')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Reject Deletion
                </button>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;