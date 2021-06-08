import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { User } from '../../models/user'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)

  const next = () => {
    if (page <= lastPage) {
      setPage(page + 1)
    }
  }

  const prev = () => {
    if (page >= 1) setPage(page - 1)
  }

  const deleteUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`/users/${id}`)
      setUsers(users.filter((u: User) => u.id !== id))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/users?page=${page}&limit=20`)

      setUsers(data.data)
      setLastPage(data.meta.last_page)
    }
    fetchData()
  }, [page])

  return (
    <>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/users/create" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>
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
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email} </td>
                  <td>{user.role.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        className="btn btn-sm btn-outline-secondary"
                        to={`/users/edit/${user.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
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
    </>
  )
}
export default Users
