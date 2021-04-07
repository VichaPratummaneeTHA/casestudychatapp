import React from 'react'

const TheirMessage = ({
  message, lastMessage
}) => {
  // console.log(lastMessage, 'lastMessage')
  // console.log(message, 'message')
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username
  return (
    <div className='message-row'>
      {
        isFirstMessageByUser && (
          <div
            className='message-avatar'
            style={{
              backgroundImage:`url(${message?.sender?.avatar})`
            }}
          />
        )
      }
      {
        message?.attachments?.length > 0 ? (
          <img
        className='message-image'
        style={{
          marginLeft: isFirstMessageByUser ? ('4px') : ('48px')
          }}
        src={message.attachments[0].file}
        alt='message-attachment'
          />
        ) : (
          <div 
        className='message'
        style={{
          float:'left', 
          backgroundColor:'#cabcdc',
          marginLeft: isFirstMessageByUser ? ('4px') : ('48px'),
          }}
          >
        {message.text}
    </div>
        )
      }
    </div>
  )
}

export default TheirMessage
