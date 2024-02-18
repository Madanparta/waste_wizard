import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import FooterComponent from './components/FooterComponent';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashBord from './pages/DashBord';
import CitizenComponent from './components/CitizenComponent';
import InchargeComponent from './components/InchargeComponent';
import InchargeOpenComp from './pages/InchargeOpenComp';
import InchargePostNews from './pages/InchargePostNews';
import InchargeReports from './pages/InchargeReports';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
    <Header/>

    <Routes>
      <Route path='/' element={<DashBord/>}/>

      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>

      <Route element={<PrivateRoute/>}>
        <Route path='/citizen' element={<CitizenComponent/>}/>
        <Route path='/incharge' element={<InchargeComponent/>}/>

        <Route path='/incharge/openComp' element={<InchargeOpenComp/>}/>
        <Route path='/incharge/news' element={<InchargePostNews/>}/>
        <Route path='/incharge/reports' element={<InchargeReports/>}/>
      </Route>

    </Routes>

    <FooterComponent/>
    </>
  )
}

export default App
