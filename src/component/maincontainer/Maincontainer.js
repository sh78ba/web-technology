import React from "react";
import "./maincontainer.css";

import QuarterList from "../Quarterlist/QuarterList";
import { Route, Routes } from "react-router-dom";
import MyQuarters from "../MyQuarter/MyQuarters";
import Request from '../Request/Request'

const Maincontainer = () => {
  return (
    <div className="maincontainer">
      <div className="maincontainer-heading">
        <h1>Welcome, Staff Member </h1>
        <h3>Find your perfect space at NIT Waranagal</h3>
      </div>
      <div className="map"></div>
      <div>
        <Routes>
          <Route
            exact
            path="/myquarters"
            element={<MyQuarters />}
          />
          <Route exact path="/dashboard" element={<QuarterList />} />
          <Route exact path="/requests" element={<Request />} />
        </Routes>
      </div>
    </div>
  );
};

export default Maincontainer;
