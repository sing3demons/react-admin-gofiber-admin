import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { Role } from '../../models/role'
import { useHistory } from 'react-router-dom'

type FormValues = {
  first_name: string
  last_name: string
  email: string
  role_id: string
}
const schema = yup.object().shape({
  email: yup.string().required('อีเมล์ห้ามว่าง').email('รูปแบบอีเมล์ไม่ถูกต้อง'),
  first_name: yup.string().required('ห้ามว่าง'),
  last_name: yup.string().required('ห้ามว่าง'),
  role_id: yup.string(),
})

const UserCreate = () => {
  const [roles, setRoles] = useState([])
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const onSubmit = handleSubmit(async ({ first_name, last_name, email, role_id }) => {
    console.log(first_name)
    console.log(role_id)

    await axios.post('/users', {
      first_name,
      last_name,
      email,
      role_id,
    })
    history.push('/users')
  })
  const getRole = async () => {
    const { data } = await axios.get('/roles')

    setRoles(data)
  }

  useEffect(() => {
    getRole()
  }, [])

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mt-3 mb-3">
          <label>First Name</label>
          <div className={`nav-link ${errors.first_name && 'alert alert-danger'}`}>
            {errors.first_name?.message}
          </div>
          <input className="form-control" {...register('first_name')} />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <div className={`nav-link ${errors.last_name && 'alert alert-danger'}`}>
            {errors.last_name?.message}
          </div>
          <input className="form-control" {...register('last_name')} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <div className={`nav-link ${errors.last_name && 'alert alert-danger'}`}>
            {errors.email?.message}
          </div>
          <input className="form-control" {...register('email')} />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select className="form-control">
            {roles.map((r: Role) => {
              return (
                <option key={r.id} value={r.id} {...register('role_id')}>
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

export default UserCreate
