import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ userData, setUserData ] = useState({});

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstname : firstName, lastname : lastName },
      email,
      password,
    }
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, newUser);
    if(res.status===201){
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      navigate("/home");
    }
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };
  
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <img
        className="w-16 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber logo"
      />
      <div>
        <form className="p-7 pb-0" onSubmit={(e) => handleFormSubmit(e)}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="w-1/2 bg-[#eeeeee] rounded-lg border px-4 py-2 text-lg placeholder:text-base"
              required
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className="w-1/2 bg-[#eeeeee] rounded-lg border px-4 py-2 text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded-lg border px-4 py-2 w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3 className="text-lg font-medium mb-2">Enter password?</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link to="/login" className="ml-1 text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
      <p className="text-[10px] leading-tight">
        This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.
      </p>
      </div>
    </div>
  );
};

export default UserSignUp;
