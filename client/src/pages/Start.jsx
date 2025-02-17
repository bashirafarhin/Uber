import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://miro.medium.com/v2/resize:fit:828/format:webp/0*SL7ScBQXovvaJT--)] h-screen pt-8 flex justify-between flex-col w-full'>
            <img className='w-14 ml-8' src="https://www.citypng.com/public/uploads/preview/uber-text-word-white-logo-png-701751694707221r0neubngm8.png" alt="uber logo"/>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
                <Link to='/login' className='flex item-center justify-center w-full bg-black text-white py-4 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start