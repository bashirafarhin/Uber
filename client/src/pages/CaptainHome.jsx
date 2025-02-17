import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import gsap from "gsap";

const CaptainHome = () => {
  const [ ridePopUpPanel, setRidePopUpPanel ] = useState(true)
  const ridePopUpPanelRef = useRef(null)
  const [ confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const confirmRidePopUpPanelRef = useRef(null)

  useEffect(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, { translateY: 0 });
    } else {
      gsap.to(ridePopUpPanelRef.current, { translateY: "100%" });
    }
  }, [ridePopUpPanel]);

  useEffect(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, { translateY: 0 });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, { translateY: "100%" });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full  w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber banner"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails/>
      </div>
      <div ref={ridePopUpPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>
      <div ref={confirmRidePopUpPanelRef} className="fixed h-screen w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
          <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
