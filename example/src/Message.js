import React from 'react'

const Message = ({ children }) => {
  return (
    <div style={{
            backgroundColor: '#f3e0ff',
            padding: '.5rem',
            color: "#53535c",
            fontSize: '.8rem',
            fontFamily: 'monospace',
            margin: '.5rem 0'}}>
      {children}
    </div>
  )
}

export default Message
