import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { User } from '../models/user'

const Nav = () => {
  const history = useHistory()
  const [user, setUser] = useState(new User())
  const fetchData = async () => {
    const { data } = await axios.get('/auth/user', { withCredentials: true })
    setUser(new User(data.id, data.first_name, data.last_name, data.email, data.role))
  }

  const logout = async () => {
    await axios.get('/auth/logout', {})
    history.go(0)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to="/" className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
        Company name
      </Link>

      <ul className="my-2 my-md-0 mr-md-3">
        <Link to="/profile" className="p-2 text-white text-decoration-none">
          {user?.name}
        </Link>
        <Link to="/login" className="p-2 text-white text-decoration-none" onClick={logout}>
          Sign out
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
