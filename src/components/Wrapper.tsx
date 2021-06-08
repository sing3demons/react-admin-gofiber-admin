import { Redirect } from 'react-router-dom'
import Menu from './Menu'
import Routes from './Routes'

function Wrapper(props: any) {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes></Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default Wrapper
