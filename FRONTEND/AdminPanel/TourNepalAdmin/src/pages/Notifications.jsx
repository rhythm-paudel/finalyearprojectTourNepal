import React, { useContext, useEffect, useState } from 'react';
import { getAccessToken, getNotificationTokens, sendNotifications } from '../api/authService';
import AuthContext from '../context/AuthProvider';

const Notifications = () => {

  const {user,setUser} = useContext(AuthContext)
  // Static users for demonstration
  const [users] = useState([
    { email: 'john@example.com', name: 'John Doe' },
    { email: 'jane@example.com', name: 'Jane Smith' },

  ]);

  const [formState, setFormState] = useState({
    title: '',
    body: '',
    recipientType: 'all', // 'all' or 'specific' for mobile users
    specificUser: '',
    messageType: 'Information'
  });

  const [userTokens,setUserTokens] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleSendNotification =async () => {

    
    if (!formState.title || !formState.body) {
      alert('Please fill in both title and body');
      return;
    }


    const recipient = formState.recipientType === 'all' 
      ? 'all' 
      : selectedUser;

    //body for sending the notification data
    const notificationData = {
      title: formState.title,
      body: formState.body,
      tokens: selectedUser,
      messagetype: formState.messageType // Added message type to payload
    };
    const response = await sendNotifications(notificationData,user.accessToken);
    if(response?.status===200){
      alert('Notification sent successfully!');
    }else if(response?.status===403){
      console.log("getting new");
      
      const newToken = await getAccessToken();
      if(newToken?.status==200){
        setUser(newToken.data);
        const response = await sendNotifications(notificationData,newToken.data.accessToken);
        if(response?.status===200){
          alert('Notification sent successfully!');
        }
      }else if(newToken.status===403){
        setUser(null);
      }
    }
    else{
      alert("Some error occured")
    }

    setFormState({ title: '', body: '', recipientType: 'all', specificUser: '', messageType: 'Information' });

  };

  

  useEffect(() => {
    const getNotiTokens = async () => {
      const notiTokes = await getNotificationTokens(user.accessToken);

      if(notiTokes?.status===200){
        setUserTokens(notiTokes?.data.tokens);
        setSelectedUser(notiTokes?.data.tokens);
      }else if(notiTokes?.status===403){
        const newToken = await getAccessToken();
        if(newToken?.status==200){
          setUser(newToken.data);
          const notiTokes = await getNotificationTokens(newToken.data.accessToken);
          if(notiTokes?.status===200){
            setUserTokens(notiTokes?.data.tokens);
            setSelectedUser(notiTokes?.data.tokens);
          }
        }else if(newToken.status===403){
          setUser(null);
        }
      }
    }

    getNotiTokens();
  },[]);

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

        {/* Notification Form */}
        <div className="mb-6 bg-gray-800 p-4 rounded-lg">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Notification Title"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formState.title}
              onChange={(e) => {setFormState({ ...formState, title: e.target.value });}}
            />
            <textarea
              placeholder="Notification Body"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formState.body}
              onChange={(e) => setFormState({ ...formState, body: e.target.value })}
              rows="3"
            />

            {/* Added message type selection */}
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
                onChange={() => {setFormState({ ...formState, recipientType: 'all' }); setSelectedUser(userTokens)}}
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
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formState.specificUser}
              onChange={(e) => {setFormState({ ...formState, specificUser: e.target.value.email });
              const selectedUser = JSON.parse(e.target.value);
      
              setSelectedUser([selectedUser])}
              }
            >
              <option value="">Select User</option>
              {userTokens.map(user => (
                <option key={user.email} value={JSON.stringify(user)}>
                  ({user.email})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleSendNotification}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;