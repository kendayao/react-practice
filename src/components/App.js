import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from "../routes/Home"
import Navigation from '../routes/Navigation'
import Authentication from '../routes/Authentication'
import Shop from '../routes/Shop'


function App(){

    return (
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='auth' element={<Authentication/>}/>
        </Route>
      

        
          
      </Routes>


    )
    
  
}

export default App