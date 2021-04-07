import React, {useState} from 'react'
// @ts-ignore
import {sendMessage, isTyping} from 'react-chat-engine'
import {SendOutlined, PictureOutlined} from '@ant-design/icons'

const MessageForm = (props) => {

  const [value, setValue] = useState('')
  const {
    chatId, creds
  } = props
  const handleOnchange = e => {
    setValue(e.target.value)

    isTyping(props, chatId)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    console.log(value)
    const text = value.trim();
    // console.log(creds, chatId, cleanText)
    if(text.length > 0){
      sendMessage(creds, chatId, {text})
    }

    setValue('')
  }

  const handleOnUpload = e => {
    sendMessage(creds, chatId, {files: e.target.files, text: ''})
  }

  return (
    <form className='message-form' onSubmit={handleOnSubmit}>
      <input 
        className='message-input'
        placeholder='Send a message here ...'
        value={value || ''}
        onChange={handleOnchange}
        onSubmit={handleOnSubmit}
      />
      <label htmlFor="upload-button">
        <span className='image-button'>
          <PictureOutlined 
            className='picture-icon'
          />
        </span>
      </label>
      <input
        id='upload-button'
        type='file'
        multiple={false}
        style={{display: 'none'}}
        onChange={handleOnUpload}
        
      />
      <button
        type='submit'
        className='send-button'
      >
        <SendOutlined 
          className='send-icon'
        />
      </button>
    </form>
  )
}

export default MessageForm
