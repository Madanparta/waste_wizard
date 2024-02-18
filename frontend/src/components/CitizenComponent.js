import { Avatar, Button, Card, FileInput, FloatingLabel, Label, Modal, Rating, TextInput, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComplaintFailure, getAllComplaintSuccss, searchComplaintFailure, uploadsComplaintFailure, uploadsComplaintStart, uploadsComplaintSuccss } from '../redux/user/complaintSlice';
import axios from 'axios';

const CitizenComponent = () => {
    const dispatch = useDispatch()
    const {complaints} = useSelector(state=>state.complaint);
    const {getAllUsers} = useSelector(state=>state.user)
    // const [conpleteError,setCompleteError]=useState(null);
    const {currentUser} = useSelector(state=>state.user)
    const [postComplaints,setPostComplaints]=useState(false);
    const [showComplaints,setShowComplaints]=useState(false);
    const [searchComplaints,setSearchComplliants]=useState(false);
    const [searchComp,setSearchComp]=useState('')
    const [searchResult,setSearchResult]=useState('')
    const [loader,setLoader]=useState(false);

    // const [allComplaints,setAllComplaints]=useState([]);
    
    // datas;
    const [formData,setFormData]=useState({
        ward_number:'',
        category:'',
        description:'',
        rate:'',
        image:'',
    })
    const [file,setFile]=useState(null);

    const onChangeHandler = (e)=>{
        const {id,value}=e.target;
        setFormData({
            ...formData,
            [id]:value
        })
    }


    const imageUpload = async() => {
        const data = new FormData();
        data.append('file',file);
        data.append('upload_preset', 'image_preset');
        try {
          let cloudName = 'dqwq8ngak';
          let resourceType = 'image';
          let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
    
          const res = await axios.post(api, data)
          const {secure_url} = res.data;
          console.log(secure_url);
          return secure_url;
        } catch (error) {
          console.log(error);
        }
      }

    const formSubmit = async(e)=>{
        e.preventDefault()

        try {
            setLoader(true)
            const imageURL =await imageUpload()
            if(imageURL){
                setFormData({
                    ...formData,
                    image:imageURL
                })
            }
            
            dispatch(uploadsComplaintStart());

            const res = await fetch('http://localhost:8080/api/complaint', {method:'POST',headers:{"Content-Type": "application/json",'x-access-token':currentUser.token},body:JSON.stringify(formData)});

            const data = await res.json();
            console.log(data);

            if(!res.ok){
                dispatch(uploadsComplaintFailure(res.message));
                setLoader(false)
            }else{
                // dispatch(uploadsComplaintSuccss(data));
                setFormData({
                    ward_number:'',
                    category:'',
                    description:'',
                    rate:'',
                    image:'',
                })
                setPostComplaints(false);
                setLoader(false)
            }
            
        } catch (error) {
            dispatch(uploadsComplaintFailure(error.message));
            setLoader(false)
        }
    }

    useEffect(()=>{
        if(!currentUser.token){
            navigator('/sign-in')
        }
        showComplaintsHandler()
    },[])

    const showComplaintsHandler = async() => {
        setShowComplaints(true)
        try {
            const res = await fetch('http://localhost:8080/api/complaint', {method:'GET',headers:{"Content-Type": "application/json",'x-access-token':currentUser.token}});
            const data = await res.json();
            
            if(!res.ok){
                dispatch(getAllComplaintFailure(res.message));
            }else{
                dispatch(getAllComplaintSuccss(data.data));
            }
        } catch (error) {
            dispatch(uploadsComplaintFailure(error.message));
        }
    }

    const compSearchHandler = () => {
        // console.log(searchComp)
        const result = complaints.length > 0 && complaints.filter((comp) => comp.ward_number.toLowerCase().includes(searchComp.toLowerCase()))
        setSearchResult(result)
    }
    return (
        <div className='min-h-[77vh] w-full flex justify-center items-center'>
            {/* className='w-full h-full flex flex-row sm:flex-col' */}
          <div className='w-full h-full flex justify-center items-center flex-col md:flex-row gap-8 p-5'>
    
            <Card onClick={()=>setPostComplaints(true)} className='cursor-pointer max-w-sm text-center hover:shadow-green-300' imgSrc='https://images.pexels.com/photos/947384/pexels-photo-947384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>
                <h5 className="text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">Post Complaints</h5>
            </Card>
    
            <Card onClick={showComplaintsHandler} className='max-w-sm text-center hover:shadow-green-300' imgSrc='https://images.pexels.com/photos/6912829/pexels-photo-6912829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>
                <h5 className="text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">View all complaints</h5>
            </Card>
    
            <Card onClick={()=>setSearchComplliants(true)} className='max-w-sm text-center hover:shadow-green-300' imgSrc='https://images.pexels.com/photos/9180894/pexels-photo-9180894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>
                <h5 className="text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">search complaints</h5>
            </Card>
          </div>
    
          {/* post complaints. modal */}
          <Modal show={postComplaints} size={'lg'} popup onClose={()=>setPostComplaints(false)}>
            <Modal.Header/>
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Complaint Details</h3>
                    <form onSubmit={formSubmit}>
                        <div className="mb-5 block">
                            <TextInput required type='text' placeholder='Enter ward number ex: WARD001' id='ward_number' value={formData.ward_number} onChange={onChangeHandler}/>
                        </div>
                        <div className="my-5 block">
                            <select required id="category" value={formData.category} onChange={onChangeHandler} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option>Select Category</option>
                                <option value="electronic_waste">Electronic waste (e-waste)</option>
                                <option value="hazardous_waste">Hazardous waste</option>
                                <option value="row_material_waste">Row Material waste</option>
                                <option value="glass_rejects">Glass Rejects</option>
                                <option value="driange">Driange</option>
                                <option value="miscellaneous">Miscellaneous</option>
                            </select>
                        </div>
                        <div className="my-5 block">
                            <Textarea required placeholder="discription..." rows={4} className='w-full' id='description' value={formData.description} onChange={onChangeHandler}/>
                        </div>
                        <hr />
                        <div className="my-5 block">
                            <legend className="mb-4">Rate Complaint : </legend>
                            <fieldset className="flex max-w-md flex-row gap-5">
                                <div className="flex items-center gap-2 flex-col">
                                    <input className='cursor-pointer' type="radio" id="rate" value="5" onChange={onChangeHandler} checked={formData.rate === '5'}/>
                                    <Label htmlFor="immediate_action">Immediate Action</Label>
                                </div>
                                <div className="flex items-center gap-2 flex-col">
                                    <input className='cursor-pointer' type="radio" id="rate" value="4" onChange={onChangeHandler} checked={formData.rate === '4'}/>
                                    <Label htmlFor="worse">Worse</Label>
                                </div>
                                <div className="flex items-center gap-2 flex-col">
                                    <input className='cursor-pointer' type="radio" id="rate" value="3" onChange={onChangeHandler} checked={formData.rate === '3'}/>
                                    <Label htmlFor="bad">Bad</Label>
                                </div>
                                <div className="flex items-center gap-2 flex-col">
                                    <input className='cursor-pointer' type="radio" id="rate" value="2" onChange={onChangeHandler} checked={formData.rate === '2'}/>
                                    <Label htmlFor="poor">Poor</Label>
                                </div>
                                <div className="flex items-center gap-2 flex-col">
                                    <input className='cursor-pointer' type="radio" id="rate" value="1" onChange={onChangeHandler} checked={formData.rate === '1'}/>
                                    <Label htmlFor="average">Average</Label>
                                </div>
                            </fieldset>
                        </div>
                        <hr />
                        <div className="my-5 block">
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="Upload file" />
                            </div>
                            <FileInput required id="file" accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
                        </div>
                        <div className="mt-10 mb-5 block">
                            <Button outline type='submit' gradientDuoTone="redToYellow" disabled={loader} className='w-[80%] mx-auto'>{loader? 'uploading':'Post Complaint'}</Button>
                        </div>
    
                    </form>
                </div>
            </Modal.Body>
          </Modal>

          {/* view complaints. model */}
          {complaints.length > 0 && <Modal show={showComplaints} popup size={'4xl'} onClose={()=>setShowComplaints(false)}>
            <Modal.Header>Complaints of Other CItizens</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    {
                        complaints.length > 0 && complaints.map((info)=>(
                            <div key={info._id}>
                                <div  className="text-base mb-5 hover:bg-gray-50 py-2 rounded-md flex gap-2 text-gray-500 dark:text-gray-400">
                                    <Avatar size={'lg'} img={info.image}/>
                                    <div className='space-y-1'>
                                        <h3 className='font-bold'>{info.ward_number}</h3>
                                        <p><span className='italic'>CATEGORY : {info.category}</span></p>
                                        <Rating className='flex gap-1'>
                                            {info.rate}<Rating.Star/>
                                        </Rating>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        ))
                    }
                    
                </div>
            </Modal.Body>
          </Modal>}

          {/* search complaints.' */}
          <Modal show={searchComplaints} popup onClose={()=>setSearchComplliants(false)}>
            <Modal.Header/>
            <Modal.Body className=''>
                <div className='py-3'>
                    <FloatingLabel variant="standard" label="Complaint ID : " id='searchComp' value={searchComp} onChange={(e)=>setSearchComp(e.target.value)}/>
                    <Button onClick={compSearchHandler} type='button' outline gradientDuoTone="greenToBlue">Search Complaint</Button>
                </div>
                <div>
                {
                    searchResult && getAllUsers.length > 0 ? getAllUsers.map((user) => (
                        <div key={user._id}>
                            <h2 className='font-bold'>Complaint Details</h2>
                            <br/>
                            {searchResult[0]?.userID === user._id && (
                                <div className='flex flex-col gap-2'>
                                    <p><span className='font-bold'>Ward</span>:       {searchResult[0].ward_number}</p>
                                    <p><span className='font-bold'>Category</span>:   {searchResult[0].category}</p>
                                    <p><span className='font-bold'>Date</span>:       {searchResult[0].createdAt}</p>
                                    <p><span className='font-bold'>Description</span>:{searchResult[0].description}</p>
                                    <p><span className='font-bold'>Citizen</span>:    {user.username}</p>
                                    <p><span className='font-bold'>aadhar ID</span>:  {user.aadharID}</p>
                                    <p><span className='font-bold'>Status</span>:      NEW</p>
                                    <p className='flex flex-row items-center'><span className='font-bold'>Rating</span>:     {searchResult[0].rate} <Rating className='inline-block'><Rating.Star/></Rating></p>
                                </div>
                            )}
                        </div>
                    )) : ""
                }

                </div>
            </Modal.Body>
          </Modal>
        </div>
      )
}

export default CitizenComponent
