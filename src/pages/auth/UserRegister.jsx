import React, { useState } from 'react'
import TextInput from '../../components/TextInput'
import BgImage from '../../assets/singupbg.jpg'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/apiIntercepeors'
import Loading from '../../components/Loading'
const UserRegister = () => {
    const navigate=useNavigate()
    const [data,setData]=useState()
    const[loading,setLoading]=useState()
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMes, setErrorMes] = useState('');
    const handleSubmit=async(event)=>{
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email');
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const password = formData.get('password');
      if(!email||!firstName||!lastName){
        setErrorMes('Fill The Form')
        return 
      }else if(password.length<8){
        setErrorMes("Password Mustbe 8 length")
        return
      }
      else{
        setData({email,password,first_name:firstName,last_name:lastName})
        setLoading(true)
          const response= await api.post('/auth/register',data)
          setLoading(false)
          if(response.status===201){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('userId',response.data.user._id)
            navigate('/')
          }else{
            errorMes(response.data.message)
          }
      }
    }
  return (
    <div className='bg-secondary bg-opacity-30 w-fulll h-screen flex justify-center items-center'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex  bg-white rounded-xl overflow-hidden shadow-xl'>
       {/* LEFT */}
       <div className=' flex-col items-center justify-center w-full lg:w-1/2 h-full p-10 2xl:px-20'>
       <h1 className='text-3xl font-sans font-semibold text-primary text-opacity-80'></h1>
        <div className='w-full flex flex-col gap-2 items-center mb-6'>
            <span className='text-2xl texxt-[#065ad8]'>Well Come TravelTies!</span>
          </div>
          <p className='text-ascent-1 text-base font-semibold'>
            Create your account
          </p>
          <div className='w-full  flex justify-center'>
          <form className='p-2 w-full flex flex-col gap-1 justify-center' onSubmit={handleSubmit}>
          <div className="w-full flex flex-col mt-2">
        <p className="font-light text-sm mb-2 ml-2">Email Address</p>
        <div className="w-full">
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            className="bg-secondary bg-opacity-20 border rounded-full border-gray-300 outline-none text-sm font-light px-3 py-3 w-full placeholder:text-[#666]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      
      <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
        <div className="w-full flex flex-col mt-2">
          <p className="font-light text-sm mb-2 ml-2">First Name</p>
          <div className="w-full">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="bg-secondary bg-opacity-20 border rounded-full border-gray-300 outline-none text-sm font-light px-3 py-3 w-full placeholder:text-[#666]"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex flex-col mt-2">
          <p className="font-light text-sm mb-2 ml-2">Last Name</p>
          <div className="w-full">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="bg-secondary bg-opacity-20 border rounded-full border-gray-300 outline-none text-sm font-light px-3 py-3 w-full placeholder:text-[#666]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <p className="font-light text-sm mb-2 ml-2">Password</p>
        <div className="w-full">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-secondary bg-opacity-20 border rounded-full border-gray-300 outline-none text-sm font-light px-3 py-3 w-full placeholder:text-[#666]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
            <button type='submit' className='inline-flex justify-center rounded-full bg-blue px-8 py-3 mt-2 text-sm font-medium text-white outline-none bg-primary '>Create Account</button>
          </form>
          </div>

          <p className='text-ascent-2 text-sm text-center text-blue-400' onClick={()=>navigate('/login')}>
            Already have an account?
          </p>
          </div>
        {/* RIGHT */}
        <div className='hidden lg:flex w-1/2 h-full flex-col justify-center items-center '>
          <div className='relative w-10/12 flex items-center justify-center  h-5/6 rounded-3xl overflow-hidden '>
          <img src={BgImage} className='h-screen w-full' alt="" />
          </div>
        </div>
      </div>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <Loading />
        </div>)}
    </div>
    
  )
}

export default UserRegister