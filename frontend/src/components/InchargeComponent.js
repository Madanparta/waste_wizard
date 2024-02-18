import { Avatar, Card, Modal, Rating } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import InchargeOpenCom from '../pages/InchargeOpenComp';
import { Link } from 'react-router-dom';

const InchargeComponent = () => {
    const [viewComplaints,setViewComplaints]=useState(false);
    const {complaints} = useSelector(state=>state.complaint);
    const [category,setCategory]=useState('')

    const filteredComplaints = complaints.filter((cat) => cat.category.toLowerCase().includes(category.toLowerCase()));
  return (
    <div className="min-h-[77vh] w-full flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center flex-col md:flex-row gap-8 p-5">
        <Card
          onClick={setViewComplaints}
          className="cursor-pointer max-w-sm text-center hover:shadow-green-300"
          imgSrc="https://tse1.mm.bing.net/th?id=OIP.sOL-PfhAWXz97Hd-rocDCQHaE8&pid=Api&P=0&h=180"
        >
          <h5 className="text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
            View All Complaints
          </h5>
        </Card>

        <Link to='/incharge/openComp'>
            <Card
            className="max-w-sm text-center hover:shadow-green-300"
            imgSrc="https://tse4.mm.bing.net/th?id=OIP.t_MQeU1cqdpf3uHPMHdv1QHaE8&pid=Api&P=0&h=180"
            >
            <h5 className="text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
                View Open Complaints
            </h5>
            </Card>
        </Link>

        <Link to='/incharge/news'>
            <Card
            className="max-w-sm text-center hover:shadow-green-300"
            imgSrc="https://images.pexels.com/photos/9180894/pexels-photo-9180894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            >
            <h5 className="text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
                Post News
            </h5>
            </Card>
        </Link>

        <Card
        //   onClick={() => setSearchComplliants(true)}
          className="max-w-sm text-center hover:shadow-green-300"
          imgSrc="https://www.datarails.com/wp-content/uploads/2021/08/Screenshot-2021-08-22-124158.jpg"
        >
          <h5 className="text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
            Reports
          </h5>
        </Card>
      </div>


      {/* models */}
      {/* <Modal show={viewComplaints} size={'lg'} popup onClose={()=>setViewComplaints(false)}>
        <Modal.Header/>
        <Modal.Body>

        </Modal.Body>
      </Modal> */}
      {complaints.length > 0 && <Modal show={viewComplaints} size={'lg'} popup onClose={()=>setViewComplaints(false)}>
            <Modal.Header>
                <select required id="category"
                 value={category}
                 onChange={(e)=>setCategory(e.target.value)}
                 className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option>Select Category</option>
                    <option value="electronic_waste">Electronic waste (e-waste)</option>
                    <option value="hazardous_waste">Hazardous waste</option>
                    <option value="row_material_waste">Row Material waste</option>
                    <option value="glass_rejects">Glass Rejects</option>
                    <option value="driange">Driange</option>
                    <option value="miscellaneous">Miscellaneous</option>
                </select>
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    {
                        filteredComplaints.length > 0 && filteredComplaints.map((info)=>(
                            <div key={info._id}>
                                <div  className="text-base mb-5 hover:bg-gray-50 py-2 rounded-md flex gap-2 text-gray-500 dark:text-gray-400">
                                    <Avatar size={'xl'} img={info.image}/>
                                    <div className='space-y-1'>
                                        <h3 className='font-bold'>{info.ward_number}</h3>
                                        <p><span className='italic'>CATEGORY : {info.category}</span></p>
                                        <p><span className='italic'>Date : {info.createdAt}</span></p>
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
    </div>
  );
}

export default InchargeComponent
