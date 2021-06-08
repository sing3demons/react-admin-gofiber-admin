import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { User } from '../../models/user'

const Users = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`/users?page=${page}&limit=4`)

      setUsers(data.data)
      setLastPage(data.meta.last_page)
    })()
  }, [page])

  const next = () => {
    if (page <= lastPage) {
      setPage(page + 1)
    }
  }

  const prev = () => {
    if (page >= 1) setPage(page - 1)
  }

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
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <p className="page-link" onClick={prev}>
              Previous
            </p>
          </li>
          <li className="page-item">
            <p className="page-link" onClick={next}>
              Next
            </p>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Users
