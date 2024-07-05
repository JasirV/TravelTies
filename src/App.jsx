import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import UserLoging from './pages/auth/UserLoging'
import UserRegister from './pages/auth/UserRegister'
import Home from './pages/home/Home'

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/login' element={<UserLoging/>}/>
          <Route path='/register'element={<UserRegister/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
        
    </>
  )
}

export default App
