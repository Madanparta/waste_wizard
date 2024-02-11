import { Button } from 'flowbite-react'
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectUserType } from '../redux/about/aboutSlice';
// import { userError, userStart } from '../redux/user/userSlice';

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectOption = useSelector(state=>state.about.userType)
  const {currentUser} = useSelector(state=>state.user)

  const buttonHandler = () => {
    if(!currentUser){
      if(selectOption && selectOption === 'citizen' || selectOption && selectOption === 'incharge'){
        navigate('/sign-in')
      }
    }else{
      if(selectOption && selectOption === 'citizen'){
        navigate('/citizen')
      }
      if(selectOption && selectOption === 'incharge'){
        navigate('/incharge')
      }
    }
  }
  return (
    <section className='h-[75vh] w-full flex justify-center items-center'>
      <div className='mt-10 ms-2'>
        <h2 className='font-sans text-3xl font-semibold text-orange-400 capitalize hover:underline'>Welcome to waste wizard</h2>

        <div className='m-5'>
          <h3 className='capitalize text-orange-400 font-sans font-semibold text-xl hover:underline'>select user</h3>
          
          <section className='flex flex-col'>
            <div className='m-5 flex flex-col gap-5'>
              <label htmlFor="incharge" className='flex gap-2 items-center'>
                <input className='cursor-pointer' type="radio" name='incharge' value="incharge" onChange={(e)=>dispatch(selectUserType(e.target.value))} checked={selectOption === "incharge"}/>
                Industrial Word Incharge
              </label>

              <label htmlFor="citizen" className='flex gap-2 items-center'>
                <input className='cursor-pointer' type="radio" name='citizen' value='citizen' onChange={(e)=>dispatch(selectUserType(e.target.value))} checked={selectOption === "citizen"}/>
                Citizen
              </label>
            </div>

            <Button onClick={buttonHandler} gradientDuoTone="tealToLime" outline className='hover:shadow active:shadow-lg'>Submit</Button>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Home
