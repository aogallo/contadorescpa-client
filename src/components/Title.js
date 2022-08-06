import React from 'react'
import { Link } from 'react-router-dom'

const Title = ({ title, breadCrumb }) => {
  return (
    <div>
      <h1 className='mt-4'>{title}</h1>
      <ol className='breadcrumb mb-4'>
        {breadCrumb
          ? breadCrumb.map((b) => {
            return (
              <li className='breadcrumb-item' key={b.name}>
                <Link className='active' to={b.path}>
                  {b.name}
                </Link>
              </li>
            )
          })
          : ''}

        <li className='breadcrumb-item active'>{title}</li>
      </ol>
    </div>
  )
}

export default Title
