import React, { useState } from 'react'
import TextInput from '../../components/TextInput'
import BgImage from '../../assets/singupbg.jpg'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/apiIntercepeors'
const UserLoging = () => {
  const navigate=useNavigate()
  const [data,setData]=useState()
  const [errorMes,setErrorMes]=useState()
  const handleSubmit= async(event)=>{
    event.preventDefault();
    const formData = new FormData(event.target);
    if( formData.get('email')===""){
      setErrorMes('Fill The Form')
      return 
    }else if(formData.get('password')===""){
      setErrorMes("Password Mustbe 8 length")
      return
    }else{
      setData({email: formData.get('email'),
      password: formData.get('password')})
      const response=await api.post('/auth/login',data)
      if(response.status===200){
        localStorage.setItem('token',response.data.token)
        navigate('/')
      }else{
        setErrorMes(response.message)}
      console.log(response);
    }
  }
  return (
    <div className='bg-secondary bg-opacity-30 w-fulll h-screen flex justify-center items-center'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-white rounded-xl overflow-hidden shadow-xl'>
       {/* LEFT */}
       <div className='flex flex-col items-center justify-center w-full lg:w-1/2 h-full p-10 2xl:px-20 '>
        <div className='w-full flex flex-col gap-2 items-center mb-6 justify-center'>
            <span className='text-2xl text-primary font-bold'>Well Come Back </span>
          </div>
          <p className='text-ascent-1 text-base font-semibold'>
            Login Your Account
          </p>
          <div className='w-full  flex justify-center '>
          <form className='p-2 w-full flex flex-col gap-1 justify-center ' onSubmit={handleSubmit}>
            <TextInput name="email" placeholder="email@example.com" label="Email Address" type="email" styles='w-full rounded-full' labelStyle='ml-2'  />
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput name="password" placeholder="Password" label="Password" type="Password" styles='w-full rounded-full' labelStyle='ml-2'  />
            </div>
            {errorMes&&<p className='text-red-500'>{errorMes}</p>}
            <button type='submit' className='inline-flex justify-center rounded-full bg-blue px-8 py-3 mt-2 text-sm font-medium text-white outline-none bg-primary '>Create Account</button>
          </form>
          </div>

          <p className='text-ascent-2 text-sm text-center text-blue-400' onClick={()=>navigate('/register')}>
          Don't have an account?
          </p>
          </div>
        {/* RIGHT */}
        <div className='hidden lg:flex w-1/2 h-full flex-col justify-center items-center '>
          <div className='relative w-10/12 flex items-center justify-center  h-5/6 rounded-3xl overflow-hidden '>
          <img src={BgImage} className='h-screen w-full' alt="" />
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default UserLoging