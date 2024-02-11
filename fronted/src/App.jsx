import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home';
import FooterCom from './components/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Citizen from './components/Citizen';
import Incharge from './components/Incharge';

const App = () => {
  return (
    <section>
    <Header/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>

      <Route path='/citizen' element={<Citizen/>}/>
      <Route path='/incharge' element={<Incharge/>}/>
    </Routes>

    <FooterCom/>
    </section>
  )
}

export default App
