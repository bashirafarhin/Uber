import React, { useState, useContext, useEffect} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!token){ //we can't just rely on this as maybe that token is created when they entered as captain and then maybe they try to enter as user without login
            navigate('/login');
        }

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data.user);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          localStorage.removeItem("token"); //means token expire
          navigate("/login");
        });
    },[token]);


    

  if (isLoading) {
    return (
    <>Loading...</>
  )
  }
    
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper