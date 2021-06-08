import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Role } from '../../models/role'

function Roles() {
  const [roles, setRoles] = useState([])

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`roles/${id}`)
      fetchRole()
      //   setRoles(roles.filter((r: Role) => r.id !== id))
    }
  }

  const fetchRole = async () => {
    const { data } = await axios.get('roles')

    setRoles(data)
  }

  useEffect(() => {
    fetchRole()
  }, [])

  return (
    <>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/roles/${role.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(role.id)}
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
      </div>
    </>
  )
}

export default Roles
