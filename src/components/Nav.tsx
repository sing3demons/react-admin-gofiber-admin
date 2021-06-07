import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to={'/'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
        Company name
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <Link to="/login" className="nav-link" href="#">
            Sign in
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Nav
