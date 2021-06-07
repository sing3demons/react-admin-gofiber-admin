import React from 'react'
import Menu from './Menu'
import Content from './Content'

function Wrapper() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Content />
          </main>
        </div>
      </div>
    </>
  )
}

export default Wrapper
