import axios from 'axios'
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ImageUpload from '../../components/ImageUpload'

interface RouteParams {
  id: string
}

const ProductEdit = () => {
  const history = useHistory()
  const { id } = useParams<RouteParams>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`products/${id}`)
      console.log(data)

      setTitle(data.title)
      setDescription(data.description)
      setImage(data.image)
      setPrice(data.price)
    }
    fetchData()
  }, [id])

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.put(`products/${id}`, {
      title,
      description,
      image,
      price,
    })

    history.push('/products')
  }

  const updateImage = (url: string) => {
    if (ref.current) {
      ref.current.value = url
    }
    setImage(url)
  }

  return (
    <React.Fragment>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            className="form-control"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Image</label>
          <div className="input-group">
            <input
              className="form-control"
              ref={ref}
              defaultValue={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <ImageUpload uploaded={updateImage} />
          </div>
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            defaultValue={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </React.Fragment>
  )
}

export default ProductEdit
