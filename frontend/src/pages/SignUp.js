import { FloatingLabel,Button, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isValid_Aadhaar_Number, isValid_EmailID, isValid_Password, isValid_Phonenumber, isValid_VoterId } from '../utils/validation';
import { useDispatch, useSelector } from "react-redux";
import { userError,userStart, userSuccess } from '../redux/user/userSlice';

const SignUp = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const {error:errorMessage} = useSelector(state=>state.user);
  const [errorShowing,setErrorShowing]=useState(null);
  const [loading,setLoading]=useState(false);
  const {userType} = useSelector(state=>state.about)
  const [formData,setFormData]=useState({
    aadharID:"",
    voterID:"",
    username:"",
    password:"",
    re_password:"",
    email:"",
    phone_number:"",
    role:userType,
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
    
    if(isValid_Aadhaar_Number(formData.aadharID) !== true){
      // return dispatch(userError(isValid_Aadhaar_Number(formData.aadharID)))
      return setErrorShowing(isValid_Aadhaar_Number(formData.aadharID))
    }
    if(isValid_VoterId(formData.voterID) !== true){
      // return dispatch(userError(isValid_VoterId(formData.voterID)))
      return setErrorShowing(isValid_VoterId(formData.voterID))
    }
    if(formData.username.length < 1){
      // return dispatch(userError("Please enter valide username"))
      return setErrorShowing("Please enter valide username")
    }
     if(isValid_Password(formData.password) !== true){
      // return dispatch(userError(isValid_Password(formData.password)))
      return setErrorShowing(isValid_Password(formData.password))
    }
    if(formData.password !== formData.re_password){
      // return dispatch(userError("Please enter valid password"))
      return setErrorShowing("Please enter valid password")
    }
    if(isValid_Phonenumber(formData.phone_number) !== true){
      // return dispatch(userError(isValid_Phonenumber(formData.phone_number)))
      return setErrorShowing(isValid_Phonenumber(formData.phone_number))
    }
    if(isValid_EmailID(formData.email) !== true ){
      // return dispatch(userError(isValid_EmailID(formData.email)))
      return setErrorShowing(isValid_EmailID(formData.email))
    }

    try {
      dispatch(userStart())
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/signup',{method:'POST',headers:{"Content-Type": "application/json",},body:JSON.stringify(formData)});
      const data = await res.json()

      if(!res.ok){
        dispatch(userError(data.message))
      }else{
        setErrorShowing(null)
        setLoading(false);
        dispatch(userSuccess(data))
        setFormData({
          aadharID:"",
          voterID:"",
          username:"",
          password:"",
          re_password:"",
          email:"",
          phone_number:"",
        })
        navigation('/sign-in')
      }

    } catch (error) {
      dispatch(userError(error.message))
      setLoading(false);
    }
  }
  return (
    <section className='w-full h-full font-sans p-5 flex justify-center items-center flex-col'>

    <div className='sm:w-full max-h-fit sm:h-full md:w-3/12 p-5'>
      {/* alert */}
      <div className='my-5'>
      {errorMessage && <Alert className='mt-5 text-sm' color='failure'>
      {errorMessage}
      </Alert>}
      {errorShowing && <Alert className='mt-5 text-sm' color='failure'>
      {errorShowing}
      </Alert>}
      </div>
      <form onSubmit={formHandling} className='flex flex-col gap-3 mb-4'>
        <h2 className='text-3xl mb-3 text-slate-500'>Registration</h2>
        <div className='mb-2'>
          <FloatingLabel variant="standard" label="Enter Aadhar ID" size="md" type='text' name="aadharID" value={formData.aadharID} onChange={formValueHandle}/>
        </div>
        <div className='mb-2'>
          <FloatingLabel variant="standard" label="Enter Voter ID" size="md" type='text' name="voterID" value={formData.voterID} onChange={formValueHandle}/>
        </div>
        <div className='mb-2'>
          <FloatingLabel variant="standard" label="Enter Username" size="md" type='text' name="username" value={formData.username} onChange={formValueHandle}/>
        </div>
        <div className='mb-2'>
          <FloatingLabel variant="standard" label="Enter Password" size="md" type='password' name="password" value={formData.password} onChange={formValueHandle}/>
        </div>
        <div className='mb-2'>
          <FloatingLabel variant="standard" label="Confirm Password" size="md" type='password' name="re_password" value={formData.re_password} onChange={formValueHandle}/>
        </div>
        <div className='mb-2'>
          <FloatingLabel variant="standard" label="Enter Email ID" size="md" type='email' name="email" value={formData.email} onChange={formValueHandle}/>
        </div>
        <div className='mb-2'>
          <FloatingLabel variant="standard" label="Enter mobile number" type="number" size="md" name="phone_number" value={formData.phone_number} onChange={formValueHandle}/>
        </div>
        
        <Button outline gradientDuoTone="redToYellow" type='submit' disabled={loading}>
          {
          loading?(
            <>
            <Spinner size="sm"/>
            <span className='pl-2'>Loading...</span>
            </>
          ):"REGISTER"
          }
        </Button>
        {/* <Button outline gradientDuoTone="redToYellow" type='submit'>REGISTER</Button> */}
      </form>
      <Link to="/sign-in" className='underline text-sm text-slate-500'>Do have already account?</Link>
    </div>

  </section>
  )
}

export default SignUp
