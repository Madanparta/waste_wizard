import { Navbar,Button } from 'flowbite-react';
import waste_wizard_logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { aboutToggle } from '../redux/about/aboutSlice';
import About from '../pages/About';


const Header = () => {
    const dispatch = useDispatch()

    return (
        <Navbar className='border-b-2 sticky top-0 left-0 z-50'>
            <Link to='/'>
                <img className='mr-3 h-16 sm:h-20' src={waste_wizard_logo} alt="waste_wizard_logo" />
            </Link>

            <Navbar.Collapse>
                <Navbar.Link active as={'div'}>
                    <Button onClick={()=>dispatch(aboutToggle(true))} outline gradientDuoTone='greenToBlue'>About</Button>
                    <About/>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header
