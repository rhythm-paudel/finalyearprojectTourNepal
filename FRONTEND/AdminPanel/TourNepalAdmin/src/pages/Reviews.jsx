import React, { useEffect, useState,useContext } from 'react';
import { getReviews,deleteReview, getAccessToken } from '../api/authService';
import Loading from '../components/Loading';
import  AuthContext  from '../context/AuthProvider';


const Reviews = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const {user,setUser} = useContext(AuthContext);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      comment: 'Great place!',
      placeName: 'Central Park',
      fullName: 'John Doe',
      email: 'john@example.com',
      placeid:1
    },
    {
      id: 2,
      comment: 'Could be better',
      placeName: 'Eiffel Tower',
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      placeid:2
    },
 
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = async (ids) => {

    const response = await deleteReview(ids.reviewid,ids.placeid,user.accessToken)
    if(response?.status===200){
      setReviews(reviews.filter(review => review.id !== ids.reviewid));
  
    }else if(response?.status===403){
      const newToken = await getAccessToken();
      if(newToken?.status===200){
        setUser(newToken.data)
        const response = await deleteReview(ids.reviewid,ids.placeid,newToken.data.accessToken)
        if(response?.status===200){
          setReviews(reviews.filter(review => review.id !== ids.reviewid));
      
        }

      }
    }
    setDeleteConfirm(null);
  };

  const filteredReviews = reviews.filter(review => 
    Object.values(review).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  useEffect(() => {
    const fetchReviews = async (token) => {
      const response = await getReviews(token);
      if(response?.status===200){
        const reviews = [];
        response.data.reviews.forEach(location => {
    
        location.reviews.forEach(review => {
       
          
          reviews.push({
            id: review._id,
            comment: review.text,
            placeName: location.name,
            fullName: `${review.firstname} ${review.lastname}`,
            email: review.email,
            placeid : location._id
          });
        });
      });

      setReviews(reviews);
      }
      
      
      
    }

    fetchReviews(user.accessToken);
  },[])

  return (
    <div className="p-6 bg-white-900 min-h-screen text-white">
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="mb-4">Are you sure you want to delete this review?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
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
          <h1 className="text-2xl font-bold text-indigo-400">Reviews Management</h1>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search reviews..."
            className="bg-gray-800 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">
              Showing {indexOfFirstReview + 1} to {Math.min(indexOfLastReview, filteredReviews.length)} of {filteredReviews.length} entries
            </span>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-800">
          <table className="w-full">
            <thead className="bg-blue-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Comment</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Place Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Full Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {currentReviews.map((review) => (
                <tr 
                  key={review.id} 
                  className="hover:bg-gray-800 hover:text-white transition-colors group"
                >
                  <td className="px-6 py-4 group-hover:text-white text-black">{review.comment}</td>
                  <td className="px-6 py-4 group-hover:text-white text-black">{review.placeName}</td>
                  <td className="px-6 py-4 group-hover:text-white text-black">{review.fullName}</td>
                  <td className="px-6 py-4 group-hover:text-white text-black">{review.email}</td>
                  <td className="px-6 py-4">
                    <button
                     onClick={() => setDeleteConfirm({reviewid: review.id, placeid: review.placeid})}
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
            Showing {indexOfFirstReview + 1} to {Math.min(indexOfLastReview, filteredReviews.length)} of {filteredReviews.length} entries
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

export default Reviews;