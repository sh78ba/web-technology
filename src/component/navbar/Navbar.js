
import React from 'react';
import { GiStairs } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import './navbar.css';
import { useNavigate } from 'react-router-dom';
// import { useUser } from '../UserContext'; // Import useUser hook

import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
    const navigate = useNavigate();


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
            <div className='navbar-heading'>
                <h2><GiStairs />NIT Warangal Staff Housing</h2>
            </div>
            <div className='nav'>
                <ul>
                    <li onClick={() => navigate("/user/dashboard")}>
                        Dashboard
                    </li>
                    <li onClick={() => navigate("/user/myquarters")}>
                        Your Quarters
                    </li>
                    <li onClick={() => navigate("/user/requests")}>
                        Requests
                    </li>
                    <li>Your Previous Requests</li>
                    <li className='logout-btn' onClick={handleLogout}>
                        LogOut
                    </li>
                    <li><FaRegUser /></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
