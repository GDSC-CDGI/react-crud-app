import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbaar from './components/Navbaar/navbaar';
import Home from './components/Home/home';
import AddUser from './components/AddUser/addUser';
import EditUser from './components/EditUser/editUser';
import ViewUser from './components/ViewUser/viewUser';

import {Outlet, Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <div>
      <Navbaar />

      <Routes>
        <Route path="/add-user" element={<AddUser />} />
        <Route path='/edit-user/:id' element={<EditUser />} />
        <Route path='/view-user/:id' element={<ViewUser/>} />

        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

