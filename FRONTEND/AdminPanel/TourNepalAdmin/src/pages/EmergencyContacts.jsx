import React, { useEffect, useState,useContext } from 'react';
import { getAccessToken, getContacts } from '../api/authService';
import { editContact } from '../api/authService';
import { deleteContact as dc } from '../api/authService';
import { addContact as ac } from '../api/authService';
import AuthContext from '../context/AuthProvider';


const EmergencyContacts = () => {

  const {user,setUser} = useContext(AuthContext); // for sending access token while sending requests like edit or delete
  // Initial contacts data
  const [contacts, setContacts] = useState([
    { _id: 1, name: 'Police', number: '100' },
    { _id: 2, name: 'Ambulance', number: '103' },
  ]);

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: '', number: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saveConfirm, setSaveConfirm] = useState(null);
  const [addConfirm, setAddConfirm] = useState(null);

  // Handle edit click
  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setEditValues({ name: contact.name, number: contact.number });
  };

  // Handle input changes
  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  // Save edits
  const saveEdits = async (id) => {
    
    
    const response = await editContact(id, editValues,user.accessToken);
    

    if (response?.status === 200) {


      setContacts(contacts.map(contact =>
        contact._id === id ? { ...contact, ...editValues } : contact
      ));
      window.alert('Contact Updated successfully!');



    } else if(response?.status===403){
      const newToken = await getAccessToken();
      if(newToken.status === 200){
        setUser(newToken.data);
        const response = await editContact(id, editValues,newToken.data.accessToken);
        if (response?.status === 200) {
          setContacts(contacts.map(contact =>
            contact._id === id ? { ...contact, ...editValues } : contact
          ));
          window.alert('Contact Updated successfully!');
        }
      }else if(newToken.status===403){
        setUser(null);
      }

    }else {
      window.alert('Something went wrong!');

    }
    setEditingId(null);
    setSaveConfirm(null);


  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
  };

  // Add new contact
  const addContact =async  () => {

    if (newContact.name && newContact.number) {
      const response =await ac(newContact.name, newContact.number,user.accessToken);
      if (response?.status === 200) {
        window.alert('Contact Added successfully!');
        setContacts([...contacts, {
          _id: response.data.id,
          ...newContact
        }]);
       
      }else if(response?.status===403){
        console.log("getting new token");
        
        const newToken = await getAccessToken();
        if(newToken.status === 200){
          setUser(newToken.data);
          const response =await ac(newContact.name, newContact.number,newToken.data.accessToken);
          if (response?.status === 200) {
            window.alert('Contact Added successfully!');
            setContacts([...contacts, {
              _id: response.data.id,
              ...newContact
            }]);
          }
        }else if(newToken.status===403){
          setUser(null);
        }
      }
      else{
        window.alert('Something went wrong!');
      }

      setNewContact({ name: '', number: '' });
      setShowAddForm(false);
      setAddConfirm(null);
      
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    const response = await dc(id,user.accessToken);
    if (response?.status === 200) {
      window.alert('Contact Deleted successfully!');
      setContacts(contacts.filter(contact => contact._id !== id));
    }else if(response?.status===403){
      const newToken = await getAccessToken();
      if(newToken.status === 200){
        setUser(newToken.data);
        const response = await dc(id,newToken.data.accessToken);
        if (response?.status === 200) {
          window.alert('Contact Deleted successfully!');
          setContacts(contacts.filter(contact => contact._id !== id));
        }
      }else if(newToken.status===403){
        setUser(null);
      }
    }
    else {
      window.alert('Something went wrong!');
    }
    setDeleteConfirm(null);
  };

  //initial loading of the emergency contact number
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await getContacts();
      if (response?.status === 200) {
        setContacts(response.data)
        console.log(response.data);
      }
    }
    fetchContacts();
  }, [])

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
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newContact.number}
                onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setAddConfirm(true)}
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
                <tr key={contact._id} className="hover:bg-gray-800 hover:text-white transition-colors group">
                  <td className="px-6 py-4 group-hover:text-white text-black">
                    {editingId === contact._id ? (
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
                    {editingId === contact._id ? (
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
                    {editingId === contact._id ? (
                      <>
                        <button
                          onClick={() => setSaveConfirm(contact._id)}
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
                          onClick={() => handleEdit(contact)}
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(contact._id)}
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

        {/* Save Confirmation Modal */}
        {saveConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-4">Are you sure you want to save these changes?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => saveEdits(saveConfirm)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setSaveConfirm(null)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Confirmation Modal */}
        {addConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-4">Are you sure you want to add this contact?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={addContact}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => setAddConfirm(null)}
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