import React from 'react'
import { Table } from 'antd'

class TableDefault extends React.Component {
  render() {
    const { columns, title, cards } = this.props
    return (
      <div>
        <div className="Table-Container">
          <h1>{title}</h1>

          {<Table columns={columns} dataSource={cards} />}
        </div>
        <style jsx>{`
          .Table-Container {
            margin-left: 3%;
            margin-right: 3%;
          }
        `}</style>
      </div>
    )
  }
}

export default TableDefault
