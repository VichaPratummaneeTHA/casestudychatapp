import React, {useState} from 'react'
import axios from 'axios'

const LoginForm = ({
  projectID
}) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleOnchange = e => {
    setError('')
    setUserName(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const authObject = {
      'Project-ID': projectID,
      'User-Name': userName,
      'User-Secret': password,
    }

    const chatEngineURL = 'https://api.chatengine.io/chats'

    try {
      //Username & Password => chatengine => give message
      await axios.get(chatEngineURL,{
          headers: authObject,
        }
      )
      // if work => Log in
        localStorage.setItem('username', userName);
        localStorage.setItem('password', password);

       window.location.reload(); 
        setError('');

    } catch (error) {
      // if error => try with new userName
      setError('Opp, incorrect credentials try it again !!!!')
      setUserName('')
      setPassword('')
    }
  }

  return (
    <div className='wrapper'>
      <div className='form'>
        <h1 className='title'>Chat Appication</h1>
        <form onSubmit={handleSubmit}>
          <input 
            className='input'
            placeholder='username'
            required
            type="text"
            value={userName || ''}
            onChange={handleOnchange}
            />
          <input 
            className='input'
            placeholder='password'
            required
            type="password"
            value={password || ''}
            onChange={e => setPassword(e.target.value)}
            />
            <div align='center'>
              <button type='submit' className='button'>
                  <span>Start Chatting</span>
              </button>
            </div>
            <h2 className='error'>{error}</h2>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
