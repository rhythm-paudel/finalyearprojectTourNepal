import React, { useContext, useEffect, useState } from 'react';
import { getAccessToken, getNotificationTokens, sendNotifications } from '../api/authService';
import AuthContext from '../context/AuthProvider';

const Notifications = () => {
  const { user, setUser } = useContext(AuthContext);
  const [users] = useState([
    { email: 'john@example.com', name: 'John Doe' },
    { email: 'jane@example.com', name: 'Jane Smith' },
  ]);

  const [formState, setFormState] = useState({
    title: '',
    body: '',
    recipientType: 'all',
    specificUser: '',
    messageType: 'Information'
  });

  const [userTokens, setUserTokens] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = userTokens.filter(user =>
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredUsers(filtered);
  };

  const handleUserSelect = (user) => {
    setFormState(prev => ({ ...prev, specificUser: user.email }));
    setSelectedUser([user]);
    setSearchQuery('');
    setFilteredUsers([]);
  };

  const handleSendNotification = async () => {
    if (!formState.title || !formState.body) {
      alert('Please fill in both title and body');
      return;
    }

    const notificationData = {
      title: formState.title,
      body: formState.body,
      tokens: selectedUser,
      messagetype: formState.messageType
    };

    try {
      const response = await sendNotifications(notificationData, user.accessToken);
      if (response?.status === 200) {
        alert('Notification sent successfully!');
      } else if (response?.status === 403) {
        const newToken = await getAccessToken();
        if (newToken?.status === 200) {
          setUser(newToken.data);
          const retryResponse = await sendNotifications(notificationData, newToken.data.accessToken);
          if (retryResponse?.status === 200) {
            alert('Notification sent successfully!');
          }
        } else if (newToken.status === 403) {
          setUser(null);
        }
      } else {
        alert("Some error occurred");
      }
    } catch (error) {
      alert("Error sending notification: " + error.message);
    }

    setFormState({ title: '', body: '', recipientType: 'all', specificUser: '', messageType: 'Information' });
  };

  useEffect(() => {
    const getNotiTokens = async () => {
      try {
        const notiTokes = await getNotificationTokens(user.accessToken);
        if (notiTokes?.status === 200) {
          setUserTokens(notiTokes?.data.tokens);
          setSelectedUser(notiTokes?.data.tokens);
        } else if (notiTokes?.status === 403) {
          const newToken = await getAccessToken();
          if (newToken?.status === 200) {
            setUser(newToken.data);
            const retryTokes = await getNotificationTokens(newToken.data.accessToken);
            if (retryTokes?.status === 200) {
              setUserTokens(retryTokes?.data.tokens);
              setSelectedUser(retryTokes?.data.tokens);
            }
          } else if (newToken.status === 403) {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    getNotiTokens();
  }, [user.accessToken, setUser]);

  useEffect(() => {
    if (formState.recipientType === 'all') {
      setSelectedUser(userTokens);
    }
  }, [formState.recipientType, userTokens]);

  return (
    <div className="p-6 bg-white-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-400">Send Notifications</h1>
        </div>

        <div className="mb-6 bg-gray-800 p-4 rounded-lg">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Notification Title"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
            />
            <textarea
              placeholder="Notification Body"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formState.body}
              onChange={(e) => setFormState({ ...formState, body: e.target.value })}
              rows="3"
            />

            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="messageType"
                  value="Alert"
                  checked={formState.messageType === 'Alert'}
                  onChange={(e) => setFormState({ ...formState, messageType: e.target.value })}
                />
                Alert
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="messageType"
                  value="Information"
                  checked={formState.messageType === 'Information'}
                  onChange={(e) => setFormState({ ...formState, messageType: e.target.value })}
                />
                Information
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="recipientType"
                checked={formState.recipientType === 'all'}
                onChange={() => {
                  setFormState({ ...formState, recipientType: 'all' });
                  setSelectedUser(userTokens);
                }}
              />
              Send to All Users
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="recipientType"
                checked={formState.recipientType === 'specific'}
                onChange={() => setFormState({ ...formState, recipientType: 'specific' })}
              />
              Send to Specific User
            </label>
          </div>

          {formState.recipientType === 'specific' && (
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              
              {filteredUsers.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredUsers.map(user => (
                    <div
                      key={user.email}
                      className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex justify-between items-center"
                      onClick={() => handleUserSelect(user)}
                    >
                      <div>
                      
                        <span className="text-gray-400 ml-2 text-sm">({user.email})</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {formState.specificUser && (
                <div className="mt-2 text-sm text-gray-300">
                  Selected: {formState.specificUser}
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleSendNotification}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors w-full"
          >
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;