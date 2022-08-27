import React from 'react'


const Table = ({ columns, data }) => {
  const rowKeys = columns.map((column) => column['key'])
  console.log(data)
  const rows = data && data.map((element) => (
    <tr key={element.id}>
      {
        rowKeys.map((row) => <td key={row}>{ row.includes('date') ? console.log((element[row].toLocaleDateString())) :element[row]}</td>)
        // rowKeys.map((rowKey) => {
        //     const row = element[rowKey]
        //     console.log(row)
        //     return (
        //     <td>
        //       {row}
        //     </td >
        //   )
        // })
      }
    </tr >
  ))
return (
  <div className='table-container'>
    <table>
      <thead>
        <tr>
          {
            columns &&
            columns.map((column) => <th key={column['key']}>{column['column']}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          rows
        }
      </tbody>

    </table>
  </div>
)
}

export default Table
