import React from 'react'
import Navbar from './Navbar'

const MainNav = ({child}) => {
  return (
    <div>
        <Navbar/>
        {child}
    </div>
  )
}

export default MainNav