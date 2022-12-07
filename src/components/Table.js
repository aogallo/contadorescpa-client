import React from 'react'
import { NavLink } from 'react-router-dom'

import 'components/Table/Table.css'
import { BiEdit, BiTrash } from 'react-icons/bi'


const Table = ({ columns, data, editRoute, }) => {
  const handleShowModal = (element) => {
    console.log(element)
  }

  const actionsButtons = (element) => {
    return (
      <td className='table__action' key={element.id}>
        <span className='btn__action'>
          <NavLink
            type='button'
            to={`${editRoute}${element.id}`}
            // to={`/client/edit/14`}
            className='btn__action-edit'
          >
            <BiEdit />
          </NavLink>
        </span>
        <span className='btn__action'>
          <a
            className='btn__action-delete'
            onClick={() => handleShowModal(element)}
          >
            <BiTrash />
          </a>
        </span>
      </td>
    )
  }
  const rowKeys = columns.map((column) => column['key'])
  const rows = data && data.map((element) => (
    <tr key={element.id} className='table__row'>
      {
        rowKeys.map((row) =>
          row === 'actions' ? actionsButtons(element) :
            <td className='table__row-content' key={row}> {element[row] ? element[row] : '-'} </td>)
      }
    </tr >
  ))
  return (
    <div className='table'>
      <table className='table__content'>
        <thead>
          <tr className='table__header'>
            {
              columns &&
              columns.map((column) => <th className='table__title' key={column['key']}>{column['column']}</th>)
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
