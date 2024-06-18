import React, { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Create  from './create';
import  Contacts  from './contact';
import  Update  from './update';
import Remote from './Remote'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Contacts/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/update/:id' element={<Update/>}></Route>
      <Route path='/remote' element={<Remote/>}></Route>
    </Routes>
    </BrowserRouter>

    </div>
  )
}

export default App
