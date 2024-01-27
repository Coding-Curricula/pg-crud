import React, { useState, useEffect } from 'react'

export default function UserForm({ addUser, updateUser, initialUser }) {
    const [user, setUser] = useState(initialUser || { name: '', location: '' })

    useEffect(() => {
        if (initialUser) {
            setUser(initialUser)
        }
    }, [initialUser]);

    const handleChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (initialUser) {
            updateUser(initialUser.id, user)
        } else {
            addUser(user)
        }
        setUser({ name: '', location: '' })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" id="name" value={user.name} onChange={handleChange} />
                </label>
                <br />
                <label>Location:
                    <input type="text" id="location" value={user.location} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
