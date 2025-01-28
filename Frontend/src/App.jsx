import React from 'react'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import MainNav from './components/MainNav'
import AddEmployee from './components/AddEmployee'
import AdminPage from './components/AdminPage'
import UserPage from './components/UserPage'

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<PrivateRoutes/>}>
            <Route path='/admin' element={<MainNav child={<AdminPage />} />} />
            <Route path='/user' element={<MainNav child={<UserPage />} />} />
            <Route path='/addemployee' element={<MainNav child={<AddEmployee />} />} />
          </Route>
      </Routes>
    </>
  )
}

export default App