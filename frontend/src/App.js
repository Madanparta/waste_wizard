import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import FooterComponent from './components/FooterComponent';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashBord from './pages/DashBord';
import CitizenComponent from './components/CitizenComponent';

const App = () => {
  return (
    <>
    <Header/>

    <Routes>
      <Route path='/' element={<DashBord/>}/>

      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>

      <Route path='/citizen' element={<CitizenComponent/>}/>
    </Routes>

    <FooterComponent/>
    </>
  )
}

export default App
