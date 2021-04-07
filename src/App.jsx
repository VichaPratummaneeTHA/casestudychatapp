import React from 'react'
import {ChatEngine} from 'react-chat-engine'
import './App.css'
import ChatFeed from './components/ChatFeed'
import LoginForm from './components/LoginForm'

const App = () => {

  const projectID = '0fd07ef7-70eb-4fcf-be2d-d3d1622ac330'
  const userLogin = localStorage.getItem('username')
  const passwordLogin = localStorage.getItem('password')
 

  if(!userLogin){
    return(
      <LoginForm
        projectID = {projectID}
      />
    )
  }

    return (
      <ChatEngine 
        height='100vh'
        projectID={projectID}
        userName={userLogin}
        userSecret={passwordLogin}
        renderChatFeed={
          chatAppProps => <ChatFeed {...chatAppProps}/>
        }
        onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
      />
    )
}

export default App
