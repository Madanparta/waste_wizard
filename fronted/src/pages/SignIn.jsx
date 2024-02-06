import { FloatingLabel,Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {userError, userStart} from "../redux/user/userSlice";
import { isValid_Aadhaar_Number, isValid_Password } from '../utils/validation';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert } from 'flowbite-react';


const SignIn = () => {
  const dispatch = useDispatch()
  const {error:errorMessage} = useSelector(state=>state.user)
  const [formData,setFormData]=useState({
    aadharID:"",
    password:""
  })

  const formValueHandle = (e) => {
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value,
    })
  }

  const formHandling = async(e)=>{
    e.preventDefault();
    // dispatch(userStart())
    
    if(isValid_Aadhaar_Number(formData.aadharID) !== true){
      return dispatch(userError(isValid_Aadhaar_Number(formData.aadharID)))
    }
    
    if(isValid_Password(formData.password) !== true){
      return dispatch(userError(isValid_Password(formData.password)))
    }

    try {
      
    } catch (error) {
      // dispatch(userError(error.message))
    }
  }
  // console.log(errorMessage)
  return (
    <section className='w-full h-full font-sans p-10 flex justify-center items-center flex-col'>
      <div className='sm:w-full max-h-fit sm:h-full md:w-3/12 p-5 my-20'>
      <h2 className='text-3xl mb-3 text-slate-500'>Sign In</h2>
        <form onSubmit={formHandling} className='flex flex-col gap-3 mb-5 mt-5'>
          <div className='mb-3'>
            <FloatingLabel variant="standard" label="Enter Aadhar ID" type="text" size="md" name="aadharID" value={formData.aadharID} onChange={formValueHandle}/>
          </div>
          <div className='mb-3'>
            <FloatingLabel variant="standard" label="Enter Password" type="password" size="md" name="password" value={formData.password} onChange={formValueHandle}/>
          </div>
          
          <Button outline gradientDuoTone="redToYellow" type='submit'>
            LOGIN
          </Button>
        </form>
        <Link to='/sign-up' className='underline text-sm text-center text-slate-500'>No account yet.. Register Citizen</Link>

        {/* alert */}
        {errorMessage && <Alert className='mt-5 text-sm' color='failure'>
                {errorMessage}
              </Alert>}
      </div>
    </section>
  )
}

export default SignIn