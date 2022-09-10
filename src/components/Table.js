import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Table = ({ columns, data, editRoute, }) => {
  const handleShowModal = (element) => {
    console.log(element) 
  }

  const actionsButtons = (element) => {
    return (
      <td className='table-actions' key={element.id}>
      <NavLink
      type='button'
      to={`${editRoute}${element.id}`}
      // to={`/client/edit/14`}
      className='btn-edit'
      >
        <FontAwesomeIcon icon='fa-edit' className='table-icon'/>
      </NavLink>
      <a 
      className='btn-delete' 
      onClick={() => handleShowModal(element)}
      >
        <FontAwesomeIcon icon='fa-trash' className='table-icon'/>
      </a>
      </td>
    )}
  const rowKeys = columns.map((column) => column['key'])
  const rows = data && data.map((element) => (
    <tr key={element.id}>
      {
        rowKeys.map((row) => 
          row === 'actions' ? actionsButtons(element) :
          <td key={row}> { element[row] } </td>)
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
