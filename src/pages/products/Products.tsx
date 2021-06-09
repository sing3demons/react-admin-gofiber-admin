import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Paginator from '../../components/Paginator'
import { Product } from '../../models/product'
import currencyFormat from '../../utils/currencyFormat'

function Products() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)

  useEffect(() => {
    ;(async () => {
      console.log(page)
      const { data } = await axios.get(`products?page=${page}`)

      setProducts(data.data)
      setLastPage(data.meta.last_page)
    })()
  }, [page])

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`products/${id}`)

      setProducts(products.filter((p: Product) => p.id !== id))
    }
  }

  return (
    <>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/products/create" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product) => {
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img
                      src={`${p.image}`}
                      loading="lazy"
                      style={{ width: 50, height: 50, borderRadius: '5%' }}
                      alt="No"
                    />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>{currencyFormat(p.price)}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/products/edit/${p.id}`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </>
  )
}

export default Products
