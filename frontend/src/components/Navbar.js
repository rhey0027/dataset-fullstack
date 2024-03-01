import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'


const Navbar = () => {

  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = async () => {
    await logout()
  }
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
        <Link to='/'>
          <img src="/assets/bucket-logo.png" alt="Logo" width={60} />
        </Link>
        <p className='text-lg font-bold '>Bucket<strong className='text-yellow-300'>-List</strong></p>
        </div>
        {user && (
          <div className="user-login">
          <span>{user.email}</span>
          <span onClick={handleClick} className='user-logout'>Logout</span>
        </div>
        )}
        {!user && (
          <div className="nav-links">
          <Link to='/signup'>
            <span>Signup</span>
          </Link>
          <Link to='/login'>
            <span>Login</span>
          </Link>
        </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
