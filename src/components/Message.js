import React from 'react'
import 'components/Message/Message.css'

const Message = ({message}) => {
  return (
    <div className='message-container'>
      <p>{message}</p>
    </div>
  )
}

export default Message
