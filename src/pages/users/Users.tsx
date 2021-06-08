import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { User } from '../../models/user'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get('/users')
      console.log(data)
      setUsers(data.data)
    })()
  }, [])
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => {
            return (
              <tr key={user.id}>
                <th>{user.id}</th>
                <th>
                  {user.first_name} {user.last_name}
                </th>
                <th>{user.email} </th>
                <th>{user.role.name}</th>
                <th>Action</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Users
