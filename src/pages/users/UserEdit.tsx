import React, { SyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { Role } from '../../models/role'
import { useHistory, useParams } from 'react-router-dom'

interface RouteParams {
  id: string
}

function UserEdit() {
  const { id } = useParams<RouteParams>()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role_id, setRoleId] = useState('')
  const [roles, setRoles] = useState([])
  const history = useHistory()

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const { data } = await axios.put(`/users/${id}`, {
      first_name,
      last_name,
      email,
      role_id,
    })
    console.log(data)

    history.push('/users')
  }

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/roles`)
      const { data } = await axios.get(`/users/${id}`)
      setRoles(response.data)
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setEmail(data.email)
      setRoleId(data.role.id)
    }
    fetchUser()
  }, [id])

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mt-3 mb-3">
          <label>First Name</label>
          <div className={`nav-link`}></div>
          <input
            className="form-control"
            defaultValue={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <div className={`nav-link`}></div>
          <input
            className="form-control"
            defaultValue={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <div className={`nav-link`}></div>
          <input
            className="form-control"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Role </label>
          <select
            className="form-control"
            value={role_id}
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.map((r: Role) => {
              return (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              )
            })}
          </select>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </>
  )
}

export default UserEdit
