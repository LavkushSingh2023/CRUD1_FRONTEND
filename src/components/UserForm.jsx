import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ fetchUsers, editingUser, setEditingUser }) => {
  const [form, setForm] = useState({ name: '', email: '', file: null });

  useEffect(() => {
    if (editingUser) setForm(editingUser);
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try{
        if (editingUser?._id) {
            await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, data);
          } else {
            await axios.post('http://localhost:5000/api/users', data);
          }
          setForm({ name: '', email: '', file: null });
          setEditingUser(null);
          fetchUsers();
    }catch(err){
        alert('Error in saving user');
        console.log("Error in saving data: ", err);
    }
  };

  return (
    <form className="p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
      <input className="form-control mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input className="form-control mb-2" type="file" name="file" onChange={handleChange} />
      <button className="btn btn-primary w-full" type="submit">{editingUser ? 'Update' : 'Create'} User</button>
    </form>
  );
};

export default UserForm;