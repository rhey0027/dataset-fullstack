import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  // const [ type, setType ] = useState('password')


  const { login, isLoading, error } = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await login( email, password)
  }

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-logo">
          <img src="./assets/bucket-logo.png" alt="logo" />
        <h1>Bucket-List</h1>
        <h3>Login to my account</h3>
        <span></span>
        </div>
        <div className="form-input relative">
          <input
            type="email"
            placeholder="email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input 
            type={showPassword ? 'text' : 'password'}
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
              onMouseLeave={() => setShowPassword(false)}
              className="cursor-pointer absolute right-2 bottom-4  text-gray-600"
            />
          </div>
        <div className="keep-signed-in">
          <input 
            type="checkbox"
            value= 'checkbox' 
          />
          <span>Keep me log-in</span>
        </div>
        <div className="have-account">
          <p>Not yet a member?</p>
          <span><Link to='/signup'>Signup</Link></span>
        </div>
        <button disabled={isLoading}>LOG-IN MY ACCOUNT</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Login
