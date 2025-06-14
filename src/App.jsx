import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

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
    <div className="container py-5">
      <h2 className="text-2xl font-bold mb-4">MERN CRUD with File Upload</h2>
      <UserForm fetchUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />
      <UserList users={users} fetchUsers={fetchUsers} setEditingUser={setEditingUser} />
    </div>
  );
};

export default App;