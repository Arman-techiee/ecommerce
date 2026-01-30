import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/Homepage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route
      path='/'
      element={<MainLayout />}>
      <Route
      index element={<Homepage />}/>
     </Route> 
     <Route path="*" element={<NotFound />} />          

    </Routes>
  )
}

export default App