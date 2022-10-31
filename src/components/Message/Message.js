import React from 'react'
import 'components/Message/Message.css'

const Message = ({ message }) => {
  return (
    <div className='message'>
      <span className='message__text'>{message}</span>
    </div>
  )
}

export default Message
