import React from 'react'
import Requests from './Requests'
import ApplyRequest from './ApplyRequest'

const AllList = () => {
  return (
    <div>
        <Requests />
        {/* <Requests requestType ={"plumber"} />
        <Requests requestType ={"changerequest"} />
        <Requests requestType ={"others"} /> */}
        <ApplyRequest/>
   
     

    </div>
  )
}

export default AllList