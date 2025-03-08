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
import Home from "./pages/Home";
import { RequireAuth } from "./pages/RequireAuth";
import { RequireIfAuthenticated } from "./pages/RequireIfAuthenticated";

function App() {


  return (
    <Router>
      <Routes>
        {/* Public routes (no layout) */}
        <Route element={<RequireIfAuthenticated/>}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected routes (with layout) */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} /> {/* Default route for /home */}
            <Route path="users" element={<Users />} />
            <Route path="users/edit/:userId" element={<EditUser />} />
            <Route path="users/adduser" element={<AddUserForm />} />
            <Route path="emergencycontacts" element={<EmergencyContacts />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
        <Route element={<RequireAuth/>}>
          <Route path="*" element={<h1>404 Not Found</h1>} /></Route>
      </Routes>
    </Router>
   
  )
}

export default App
