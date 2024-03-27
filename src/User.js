
import React from 'react';

import Sidebar from './component/sidebar/Sidebar';
import Maincontainer from './component/maincontainer/Maincontainer';
import Navbar from './component/navbar/Navbar';


const User = () => {
  return (
   <div>
      <Navbar />
      <div className='container-wrap'>
        <Sidebar />
        <Maincontainer />
     
      </div>
      </div>
    
  );
};

export default User;
