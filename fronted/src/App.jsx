import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home';

const App = () => {
  return (
    <section>
    <Header/>

    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </section>
  )
}

export default App
