import React, { useEffect } from 'react'
import * as c3 from 'c3'
import axios from 'axios'

const Dashboard = () => {
  useEffect(() => {
    const fetchData = async () => {
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [['x'], ['Sales']],
          types: {
            Sales: 'bar',
          },
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d',
            },
          },
        },
      })

      const { data } = await axios.get('/orders/chart')
      chart.load({
        columns: [
          ['x', ...data.map((r: any) => r.date)],
          ['Sales', ...data.map((r: any) => r.sum)],
        ],
      })
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <h2>Daily Sales</h2>

      <div id="chart" />
    </React.Fragment>
  )
}

export default Dashboard
