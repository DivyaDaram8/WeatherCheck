import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([
        // {
        //     Name: "Divya",
        //     Email: "divya@gmail.com",
        //     Age: 20,
        // },
    ]);

    useEffect(() =>{
        axios.get('http://localhost:3000')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3000/deleteUser/'+id)
        .then(res => {console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container-fluid d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="bg-white col-12 col-md-8 col-lg-6 rounded p-3 shadow">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="text-primary">User List</h3>
                    <Link to="/create" className="btn btn-success">Add +</Link>
                </div>
                <table className="table table-bordered table-responsive-md">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td className="d-flex gap-2">
                                    <Link to={`/update/${user._id}`} className="btn btn-warning btn-sm">Update</Link>
                                    <button className="btn btn-danger btn-sm" 
                                    onClick={(e) => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
