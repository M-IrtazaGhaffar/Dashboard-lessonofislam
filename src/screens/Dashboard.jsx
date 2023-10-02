import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { logout } from '../auth/logout'
import Footer from '../components/Footer'

function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='nav1'>
        <h1>Dashboard</h1>
        <svg onClick={() => logout()} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
          <path d="M7.5 1v7h1V1h-1z" />
          <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
        </svg>
      </div>
      <div className='nav2'>
        <Link to='/dashboard/'>Home</Link>
        <Link to='/dashboard/settings'>Settings</Link>
      </div>
      <div className='outlet'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard