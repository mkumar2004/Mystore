import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
        <Header/>
             
        <main>
          <Outlet>
             
          </Outlet>
        </main>
        
        <Footer/>
    </div>
  )
}

export default UserLayout