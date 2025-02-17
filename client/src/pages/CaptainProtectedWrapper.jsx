import React, { useState, useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) { //we can't just rely on this as maybe that token is created when they entered as user and then maybe they try to enter as captain without login
      navigate("/captain-login");
    }

    axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setCaptain(res.data.captain);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      localStorage.removeItem("token"); //means token expire
      navigate("/captain-login");
    }, [token]);

  }, [token]);

  if (isLoading) {
    return (<>Loading...</>)
  }

  return (<>{children}</>);
};

export default CaptainProtectedWrapper;
