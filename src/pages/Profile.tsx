import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const history = useHistory()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirm, setPasswordConfirm] = useState('')

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.put('/users/info', {
      first_name,
      last_name,
      email,
    })
    history.go(0)
  }
  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.put('/users/password', {
      password,
      password_confirm,
    })
    history.go(0)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get('/auth/user')
      console.log(data)
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setEmail(data.email)
    }
    fetchUser()
  }, [])

  return (
    <React.Fragment>
      <h3>Account Information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            defaultValue={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            defaultValue={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password Confirm</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </React.Fragment>
  )
}

export default Profile
