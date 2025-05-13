import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './userSlice'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    if (userData) {
      setLoading(false)
      return
    }
    try {
      const user = await axios.get('http://localhost:3000/profile', {
        withCredentials: true,
      })
      dispatch(addUser(user.data))
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return navigate('/login')
      }
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Body
