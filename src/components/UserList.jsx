import React from 'react';
import axios from 'axios';

const UserList = ({ users, fetchUsers, setEditingUser }) => {
  const deleteUser = async (id) => {
    try{
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
    }catch(err){
        alert('Error in deleting d');
        console.log("Error in deleting data: ", err);
    }
  };

  return (
    <div className="mt-4">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th><th>Email</th><th>File</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                {(u.file?.endsWith('.jpg') || u.file?.endsWith('.png')) ? (
                    <img className="cursor-pointer" src={`http://localhost:5000/uploads/${u.file}`} alt="" width="50" />
               
                ) : (
                    <a href={`http://localhost:5000/uploads/${u.file}`} target="_blank" rel="noreferrer">
                    📄 View here
                    </a>
                 )}
                </td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => setEditingUser(u)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;