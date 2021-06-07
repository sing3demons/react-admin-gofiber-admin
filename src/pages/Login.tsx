import React from 'react'
import axios from 'axios'
import '../signin.css'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FormValues = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().required('อีเมล์ห้ามว่าง').email('รูปแบบอีเมล์ไม่ถูกต้อง'),
  password: yup.string().required('รหัสผ่านห้ามว่าง').min(3, 'รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป'),
})

function Login() {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await axios.post('auth/login', { email, password })

    history.push('/')
  })

  return (
    <div className="text-center">
      <main className="form-signIn">
        <form onSubmit={onSubmit}>
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
            alt=""
            width={72}
            height={57}
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="name@example.com"
              {...register('email')}
            />
            <div className={`${errors.email && 'alert alert-danger'}`}>{errors.email?.message}</div>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password')}
              placeholder="Password"
            />
            <div className={`${errors.password && 'alert alert-danger'}`}>
              {errors.password?.message}
            </div>
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="mt-3 mb-3">
            <label>
              <Link className="text-decoration-none" to="/register">
                Sign up
              </Link>
            </label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
      </main>
    </div>
  )
}

export default Login
