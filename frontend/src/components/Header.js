import {Navbar,Button, Avatar, Dropdown} from 'flowbite-react';
import waste_wizard_logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { aboutToggle } from '../redux/about/aboutSlice';
import AboutComponent from './AboutComponent';
import { userError, userSuccess } from '../redux/user/userSlice';


const Header = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const {currentUser} = useSelector(state=>state.user);

    const logOutHandler = async()=>{
        try {
            const res = await fetch('http://localhost:8080/api/signOut',{method:'POST',headers:{"Content-Type": "application/json",'x-access-token':currentUser.token}});
            const data = await res.json();
            console.log(data);
            if(!res.ok){
                dispatch(userError(data.message));
            }else{
                dispatch(userSuccess(data))
                navigation('/sign-in')
            }

        } catch (error) {
            dispatch(userError(error.message))
        }
    }

    return (
        <Navbar className='border-b-2 sticky top-0 left-0 z-50'>
            <Link to='/'>
                <img className='mr-3 h-16 sm:h-20' src={waste_wizard_logo} alt="waste_wizard_logo" />
            </Link>

            <Navbar.Collapse>
                {currentUser.rest && <div className="flex md:order-2 ml-5">
                    <Dropdown arrowIcon={false} inline label={<Avatar src="" alt='profile_imge' className='border-2 rounded-full'  rounded/>} >
                        <Dropdown.Header>
                            <span className="block text-sm">{currentUser.rest.username}</span>
                            <span className='font-extralight block truncate text-sm'>{currentUser.rest.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dash Bord</Dropdown.Item>
                        <Dropdown.Item onClick={logOutHandler} className='hover:text-red-500'>SignOut</Dropdown.Item>
                    </Dropdown>

                </div>}
                <Navbar.Link active as={'div'}>
                    <Button onClick={()=>dispatch(aboutToggle(true))} outline gradientDuoTone='greenToBlue'>About</Button>
                    <AboutComponent/>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header
