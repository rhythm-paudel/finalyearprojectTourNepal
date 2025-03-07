import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import './index.css'; 
import  Layout  from "./pages/Layout";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import EmergencyContacts from "./pages/EmergencyContacts";
import AddUserForm from "./pages/AddUserForm";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} /> 
          <Route path="login" element={<Login />} />
          <Route path="users" element={<Users />} />
          <Route path="/users/edit/:userId" element={<EditUser />} />
          <Route path="/users/adduser/" element={<AddUserForm />} />
          <Route path="emergencycontacts" element={<EmergencyContacts />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
   
  )
}

export default App
