import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { clearUser } from './userSlice'
import axios from 'axios'

const Navbar = () => {
  const user  = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const handleLogout = async()=>{
    try {
      const response = await axios.post('http://localhost:3000/logout', {},
        { withCredentials: true })
        dispatch(clearUser())
        return navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
      
    }
  }
  
  
  return (
           <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/"  className="btn btn-ghost text-xl">Commit2Connect</Link>
  </div>
  {user && (<div className="flex gap-2">
    <p  className=" mx-1 input-bordered w-24 md:w-auto">Welcome, {user.firstName}</p>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a  className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={handleLogout}><Link>logout</Link></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default Navbar
