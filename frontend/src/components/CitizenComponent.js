import { Button, Card, FileInput, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadsComplaintFailure, uploadsComplaintStart, uploadsComplaintSuccss } from '../redux/user/complaintSlice';
import axios from 'axios';

const CitizenComponent = () => {
    const dispatch = useDispatch()
    const [conpleteError,setCompleteError]=useState(null);
    const {currentUser} = useSelector(state=>state.user)
    // const [imageFileUrl,setImageFileUrl]=useState(null);
    const [postComplaints,setPostComplaints]=useState(false);
    
    // datas;
    const [formData,setFormData]=useState({
        ward_number:'',
        category:'',
        description:'',
        rate:'',
        image:'https://api.cloudinary.com',
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

        // if(!file){
        //     return;
        // }
        // setImageFileUrl(URL.createObjectURL(file))

        
        try {
            console.log(formData)
            // const imageURL =await imageUpload()
            // if(imageURL){
            //     setFormData({
            //         ...formData,
            //         image:imageURL
            //     })
            // }
            
            dispatch(uploadsComplaintStart());

            const res = await fetch('http://localhost:8080/api/complaint', {method:'POST',headers:{"Content-Type": "application/json",},body:JSON.stringify(formData)});

            const data = await res.json();
            console.log(data);

            // if(!res.ok){
            //     dispatch(uploadsComplaintFailure(res.message));
            // }else{
            //     dispatch(uploadsComplaintSuccss(data));
            // }
            
        } catch (error) {
            dispatch(uploadsComplaintFailure(error.message));
        }
    }
    return (
        <div className='min-h-[77vh] w-full flex justify-center items-center'>
            {/* className='w-full h-full flex flex-row sm:flex-col' */}
          <div className='w-full h-full flex justify-center items-center flex-col md:flex-row gap-8 p-5'>
    
            <Card onClick={()=>setPostComplaints(true)} className='cursor-pointer max-w-sm text-center hover:shadow-green-300' imgSrc='https://images.pexels.com/photos/947384/pexels-photo-947384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>
                <h5 className="text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">Post Complaints</h5>
            </Card>
    
            <Card className='max-w-sm text-center hover:shadow-green-300' imgSrc='https://images.pexels.com/photos/6912829/pexels-photo-6912829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>
                <h5 className="text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">View all complaints</h5>
            </Card>
    
            <Card className='max-w-sm text-center hover:shadow-green-300' imgSrc='https://images.pexels.com/photos/9180894/pexels-photo-9180894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>
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
                            <TextInput required type='text' placeholder='Enter ward number ex: 0001' id='ward_number' value={formData.ward_number} onChange={onChangeHandler}/>
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
                        {/* <div>
                            {imageFileUrl&& <img src={imageFileUrl} alt='upload img' height='50px' width='50px' className='rounded-full cursor-pointer shadow-md'/>}
                        </div> */}
                        <div className="mt-10 mb-5 block">
                            <Button outline type='submit' gradientDuoTone="redToYellow" className='w-[80%] mx-auto'>Post Complaint</Button>
                        </div>
    
                    </form>
                </div>
            </Modal.Body>
          </Modal>
        </div>
      )
}

export default CitizenComponent