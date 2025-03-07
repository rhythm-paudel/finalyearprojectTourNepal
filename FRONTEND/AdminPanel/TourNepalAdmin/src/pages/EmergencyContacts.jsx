import React, { useState } from 'react';

const EmergencyContacts = () => {
  // Initial contacts data (static as for now)
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', number: '+1 234 567 890' },
    { id: 2, name: 'Jane Smith', number: '+1 987 654 321' },
  ]);

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: '', number: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Handle edit click
  const startEditing = (contact) => {
    setEditingId(contact.id);
    setEditValues({ name: contact.name, number: contact.number });
  };

  // Handle input changes
  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  // Save edits
  const saveEdits = (id) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, ...editValues } : contact
    ));
    setEditingId(null);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
  };

  // Add new contact
  const addContact = () => {
    if (newContact.name && newContact.number) {
      setContacts([...contacts, {
        id: Date.now(),
        ...newContact
      }]);
      setNewContact({ name: '', number: '' });
      setShowAddForm(false);
    }
  };

  // Delete contact
  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-6 bg-white-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-400">Emergency Contacts</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Add Contact
          </button>
        </div>

        {/* Add New Contact Form */}
        {showAddForm && (
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newContact.number}
                onChange={(e) => setNewContact({...newContact, number: e.target.value})}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={addContact}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Contacts Table */}
        <div className="rounded-lg overflow-hidden border border-gray-800">
          <table className="w-full">
            <thead className="bg-blue-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Phone Number</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {contacts.map(contact => (
                <tr key={contact.id} className="hover:bg-gray-800 hover:text-white transition-colors group">
                  <td className="px-6 py-4 group-hover:text-white text-black">
                    {editingId === contact.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editValues.name}
                        onChange={handleEditChange}
                        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                      />
                    ) : (
                      contact.name
                    )}
                  </td>
                  <td className="px-6 py-4 group-hover:text-white text-black">
                    {editingId === contact.id ? (
                      <input
                        type="tel"
                        name="number"
                        value={editValues.number}
                        onChange={handleEditChange}
                        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                      />
                    ) : (
                      contact.number
                    )}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {editingId === contact.id ? (
                      <>
                        <button
                          onClick={() => saveEdits(contact.id)}
                          className="text-green-400 hover:text-green-300"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(contact)}
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(contact.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-4">Are you sure you want to delete this contact?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => deleteContact(deleteConfirm)}
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
      </div>
    </div>
  );
};

export default EmergencyContacts;