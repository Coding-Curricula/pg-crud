import React, { useState, useEffect } from 'react'
import axios from 'axios'

import UserForm from './UserForm'

const API = 'https://pg-crud.onrender.com/api/users'

export default function UserList() {
    const [users, setUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null)

    useEffect(() => {
        axios.get(API)
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const addUser = (user) => {
        axios.post(API, user)
            .then(response => {
                setUsers([...users, response.data])
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteUser = (id) => {
        axios.delete(`${API}/${id}`)
            .then(response => {
                setUsers(users.filter(user => user.id !== id))
            })
            .catch(error => {
                console.log(error)
            })
    }

    const updateUser = (id, updatedUser) => {
        axios.put(`${API}/${id}`, updatedUser)
            .then(response => {
                setUsers(users.map(user => user.id === id ? updatedUser : user))
                setEditingUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const startEditingUser = (user) => {
        setEditingUser(user)
    }

    return (
        <div>
            <h1>Users</h1>
            <UserForm addUser={addUser} updateUser={updateUser} initialUser={editingUser} />
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.location}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                        <button onClick={() => startEditingUser(user)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
