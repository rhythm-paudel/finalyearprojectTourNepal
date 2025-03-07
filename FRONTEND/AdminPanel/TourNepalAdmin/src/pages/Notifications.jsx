import React, { useState } from 'react';

const Notifications = () => {
  // Static users for demonstration
  const [users] = useState([
    { email: 'john@example.com', name: 'John Doe' },
    { email: 'jane@example.com', name: 'Jane Smith' },

  ]);

  const [formState, setFormState] = useState({
    title: '',
    body: '',
    recipientType: 'all', // 'all' or 'specific' for mobile users
    specificUser: ''
  });

  const handleSendNotification = () => {
    if (!formState.title || !formState.body) {
      alert('Please fill in both title and body');
      return;
    }

    //body for sending the notification data
    const notificationData = {
      title: formState.title,
      body: formState.body,
      recipient: formState.recipientType === 'all' 
        ? 'all' 
        : formState.specificUser
    };

    console.log('Sending notification:', notificationData);
    setFormState({ title: '', body: '', recipientType: 'all', specificUser: '' });
    alert('Notification sent successfully!');
  };

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
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
            />
            <textarea
              placeholder="Notification Body"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formState.body}
              onChange={(e) => setFormState({ ...formState, body: e.target.value })}
              rows="3"
            />
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="recipientType"
                checked={formState.recipientType === 'all'}
                onChange={() => setFormState({ ...formState, recipientType: 'all' })}
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
              onChange={(e) => setFormState({ ...formState, specificUser: e.target.value })}
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.email} value={user.email}>
                  {user.name} ({user.email})
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