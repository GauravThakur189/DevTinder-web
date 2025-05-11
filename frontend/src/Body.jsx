import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar stays outside flex-grow */}
      <Navbar />

      {/* Main content area grows to fill space */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  )
}

export default Body
