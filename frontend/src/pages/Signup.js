import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ showPassword, setShowPassword ] = useState(false)


  const { signup, isLoading, error } = useSignup()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await signup(name, email, password)
  }

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-logo">
          <img src="./assets/bucket-logo.png" alt="logo" />
        <h1>Bucket-List</h1>
        <h3>Create an account</h3>
        <span></span>
        </div>
        <div className="form-input relative">
          <input
            type="text"
            placeholder="name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          <input 
            type="email"
            placeholder="email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
              onMouseLeave={() => setShowPassword(false)}
              className="absolute cursor-pointer text-gray-600 right-2 bottom-4" 
            />
          </div>
        <div className="keep-signed-in">
          <input 
            type="checkbox"
            value={''} 
          />
          <span>Keep me signed-in</span>
        </div>
        <div className="have-account">
          <p>Already have an account?</p>
          <span><Link to='/login'>Login</Link></span>
        </div>
        <button disabled={isLoading}>CREATE MY ACCOUNT</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Signup
