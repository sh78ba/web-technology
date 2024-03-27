import React from "react";
import "./container.css";
import { Route, Routes } from "react-router-dom";
import Plumber from "./Plumber";
import Electrician from "./Electrician";
import Others from "./Others";
import AllList from "./AllList";
import ApplyRequest from "./ApplyRequest";
import UpdateRoom from "./UpdateRoom";

const Container = () => {
  return (
    <div className="maincontainer">
      
      <Routes>
        <Route exact path="/dashboard" element={<AllList />} />
        <Route exact path="/plumber" element={<Plumber />} />
        <Route exact path="/electrician" element={<Electrician />} />
        <Route exact path="/others" element={<Others />} />
        <Route exact path="/applyRequest" element={<ApplyRequest/>}/>
        <Route exact path="/updateroom" element={<UpdateRoom/>}/>
      </Routes>
    </div>
  );
};

export default Container;
