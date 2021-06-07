import '../signin.css'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

type FormValues = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirm: string
}

function Register() {
  const { register, handleSubmit } = useForm<FormValues>()
  const history = useHistory()

  const onSubmit = handleSubmit(
    async ({ first_name, last_name, email, password, password_confirm }) => {
      const { data } = await axios.post('auth/register', {
        first_name,
        last_name,
        email,
        password,
        password_confirm,
      })

      console.log(data)

      history.push('/login')
    },
  )

  //   const onSubmit = handleSubmit((data) => {
  //     console.log(data)
  //     history.push('/login')
  //     setRedirect(true)
  //   })

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
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                {...register('first_name')}
                placeholder="First Name"
                required
              />

              <label htmlFor="floatingInput">First Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                {...register('last_name')}
                placeholder="Last Name"
                required
              />

              <label htmlFor="floatingInput">Last Name</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                {...register('email')}
                placeholder="name@example.com"
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                {...register('password')}
                className="form-control"
                placeholder="Password"
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                {...register('password_confirm')}
                className="form-control"
                placeholder="Password"
                required
              />
              <label htmlFor="floatingPassword">Password Confirm</label>
            </div>
          </div>
          <div className="mt-3 mb-3">
            <label>
              <Link className="text-decoration-none" to="/login">
                Sign in
              </Link>
            </label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign up
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
      </main>
    </div>
  )
}

export default Register
