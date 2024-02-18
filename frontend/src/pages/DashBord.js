import { Button } from 'flowbite-react'
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectUserType } from '../redux/about/aboutSlice';
import { useEffect } from 'react';
import { getAllUsersError, getAllUsersSuccess } from '../redux/user/userSlice';

const DashBord = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selectOption = useSelector(state=>state.about.userType)
    const {currentUser} = useSelector(state=>state.user)
  
    const buttonHandler = () => {
      if(!currentUser.rest){
        if(selectOption === 'citizen' || selectOption === 'incharge'){
          navigate('/sign-in')
        }
      }else{
        if(selectOption === 'citizen'){
          navigate('/citizen')
        }
        if( selectOption === 'incharge'){
          navigate('/incharge')
        }
      }
    }

    useEffect(()=>{
      const getAllUsers = async()=>{
        try {
          const res = await fetch('http://localhost:8080/api/users',{method:'GET',headers:{"Content-Type": "application/json",'x-access-token':currentUser.token}});
          const data = await res.json();

          if(!res.ok){
            dispatch(getAllUsersError(res.message))
          }else{
            dispatch(getAllUsersSuccess(data.users));
          }
        } catch (error) {
          dispatch(getAllUsersError(error.message))
        }
      }

      getAllUsers()
    },[currentUser.token]);
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

export default DashBord
