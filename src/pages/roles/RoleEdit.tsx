import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Permission } from '../../models/permission'

interface RouteParams {
  id: string
}

function RoleEdit() {
  const { id } = useParams<RouteParams>()
  const [permissions, setPermissions] = useState([])
  const [selected, setSelected] = useState([] as any[])
  const [name, setName] = useState('')
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      const response = await axios.get('/permission')

      setPermissions(response.data)
      console.log(response.data)
      const { data } = await axios.get(`roles/${id}`)

      setName(data.name)
      setSelected(data.permission.map((p: Permission) => p.id))
    })()
  }, [])

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    let selecteds: string[] = selected

    await axios.put(`roles/${id}`, {
      name,
      permissions: selecteds,
    })

    history.push('/roles')
  }

  const check = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id))
      return
    }

    setSelected([...selected, id])
  }

  return (
    <React.Fragment>
      <form onSubmit={submit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Permissions</label>
          <div className="col-sm-10">
            {permissions.map((p: Permission) => {
              return (
                <div className="form-check form-check-inline col-3" key={p.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={p.id}
                    checked={selected.some((s) => s === p.id)}
                    onChange={() => check(p.id)}
                  />
                  <label className="form-check-label">{p.name}</label>
                </div>
              )
            })}
          </div>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </React.Fragment>
  )
}

export default RoleEdit
