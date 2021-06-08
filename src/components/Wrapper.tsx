import Menu from './Menu'
import Routes from './Routes'
import Nav from './Nav'
function Wrapper(props: any) {
  return (
    <>
      <Nav />
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
