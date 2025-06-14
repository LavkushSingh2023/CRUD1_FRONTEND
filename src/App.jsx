import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try{
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
    }catch(err){
        alert('Error in getting user');
        console.log("Error in getting data: ", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
        
    {/* daisyUI */}
    <div className="navbar bg-primary text-primary-content">
      <button className="btn btn-ghost text-xl">CRUD Navbar</button>
    </div>

    <div className="container py-5">
      <h2 className="text-2xl font-bold mb-4">MERN CRUD with File Upload</h2>
      <UserForm fetchUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />
      <UserList users={users} fetchUsers={fetchUsers} setEditingUser={setEditingUser} />
    </div>

    {/* bootstrap */}
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">&copy; 2025 Your Company. All rights reserved.</p>
    </footer>

    </div>
  );
};

export default App;