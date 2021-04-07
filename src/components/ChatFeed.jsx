import React from 'react'
import MessageForm from './MessageForm'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'

const ChatFeed = (props) => {

  const {
    chats, activeChat, messages, userName
  } = props

  const chat = chats && chats[activeChat]

  // console.log(chats, activeChat)

  const renderReadReceipts = (message, isMyMessage) => {
    return chat.people.map((p, index) => p.last_read === message.id && (
      <div
        key={`read_${index}`}
        className='read-receipt'
        style={{
          float: isMyMessage ? ('right') : ('left'),
          backgroundImage: p.person.avatar && `url(${p?.person?.avatar})`
        }}
      >

      </div>
    ))
  }

  const renderMessages = () => {

    const messagesKeys = Object.keys(messages)

    // console.log(messagesKeys)

    return messagesKeys.map((messageKey, index) => {

      const message = messages[messageKey]
      // console.log(messages)
      // console.log(message)
      const lastMessageKey = index === 0 ? null : messagesKeys[index-1]
      // console.log(lastMessageKey)
      const isMyMessage = userName === message.sender.username
      // console.log(isMyMessage)

      return (
        <div key = {`msg_${index}`} style={{width: '100%'}}>
          <div className='message-block'>
            {
              isMyMessage ? (
                <MyMessage 
                  message = {message}
                />
              ) : (
                <TheirMessage 
                  message ={message}
                  lastMessage ={messages[lastMessageKey]}
                />
              )
            }
          </div>
          <div
            className='read-recipt'
            style={{
              marginRight: isMyMessage ? ('18px') : ('0px'),
              marginLeft: isMyMessage ? ('0px') : ('68px'),
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      )
    })
  }
  if(!chat){
    return 'Loading ....'
  }

  return (
    <div className='chat-feed'>

      <div className='chat-title-container'>
        <div className='chat-title'>
          {chat.title}
        </div>
        <div>
          {chat.people.map(p => ` ${p.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{height:'100px'}}/>
      <div className='message-form-container'>
        <MessageForm 
          {...props}
          chatId = {activeChat}
        />
      </div>
    </div>
  )
}

export default ChatFeed
