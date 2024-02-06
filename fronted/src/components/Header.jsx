import { Navbar,Button,Modal } from 'flowbite-react';
import waste_wizard_logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { aboutToggle } from '../redux/about/aboutSlice';


const Header = () => {
    // const path = useLocation().pathname;
    const dispatch = useDispatch()

    // const data = useSelector(state=>state.about.about)
    // console.log(data)
    return (
        <Navbar className='border-b-2'>
            <Link to='/'>
                <img className='mr-3 h-16 sm:h-20' src={waste_wizard_logo} alt="waste_wizard_logo" />
            </Link>

            <Navbar.Collapse>
                <Navbar.Link active as={'div'}>
                    <Button onClick={()=>dispatch(aboutToggle(true))} outline gradientDuoTone='greenToBlue'>About</Button>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header
