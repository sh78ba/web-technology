import React from 'react'
import { GiStairs } from "react-icons/gi";
import './navbar.css'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';



const NavbarGuard = () => {
const navigate=useNavigate();

const handleLogout = () => {               
  signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
  }).catch((error) => {
      console.log(error);
  });
};
  return (
    <div className='navbar'>
        <div className='navbar-heading'><h2><GiStairs />NIT Warangal Staff Housing</h2></div>
    <div className='nav'>
        <ul>

        <li onClick={()=>navigate("/guard/dashboard")}>
                Dashboard
            </li>
            <li onClick={()=>navigate("/guard/electrician")}>
                Electrician
            </li>
           
            <li onClick={()=>navigate("/guard/plumber")}>
              Plumber
            </li>
            
            <li onClick={()=>navigate("/guard/others")}>
                Others
            </li>
            <li onClick={()=>navigate("/guard/applyRequest")}>
               Apply Request
            </li>
            <li onClick={()=>navigate("/guard/updateroom")}>
               Update Room
            </li>
            <li className='logout-btn' onClick={handleLogout}>  
               LogOut
            </li>
            
        </ul>
    </div>
    </div>
  )
}

export default NavbarGuard