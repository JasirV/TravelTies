import React, { Profiler, useEffect, useRef, useState } from 'react'
import Loading from '../../components/Loading'
import { BsFiletypeGif, BsPersonFillAdd, BsPostcard } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import NavBar from '../../components/NavBar';
import NoProfile from '../../assets/defaultProfile.jpg'
import PostCard from '../../components/PostCard';
import CoverImage from '../../assets/coverImage.jpg'
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import api from '../../utils/apiIntercepeors';
import { handleFileUpload } from '../../utils/ImageUploading';

const Home = () => {
    const [posting, setPosting] = useState(false);
    const [loading, setloading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [posts,setPosts]=useState()
    const [users,setUser]=useState([])
    const [file, setFile] = useState(null);
    const description=useRef(null)

    useEffect(()=>{
        const usersFetching=async()=>{
            const response=await api.get('/auth/')
            setUser(response?.data?.data)
        }
        usersFetching()
    },[])
    const handleImageUpload=(event)=>{
        const file =event.target.files[0];
        setFile(file)
    };
    const handlePostSubmit=async(data)=>{
        event.preventDefault();
        setPosting(true)
        setErrMsg('')
        try {
            const value=await handleFileUpload(file)
            const uri=file&&value
            const userId=localStorage.getItem('token')
            const newData=uri?{...data,image:uri,userId}:data;
            console.log(newData);
            setPosting(false)
        } catch (error) {
            console.error(error);
            setPosting(false)
        }
    }
  return (
    <div className="home w-full px- lg:px-10 pb-20 2xl:px-40 bg-secondary bg-opacity-40 lg:rounded-lg h-screen overflow-hidden">
    <NavBar />
    <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
      {/* LIFT */}
      <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
        {/* Profile  */}
        <div className="w-full shadow-md bg-white rounded-lg px-6 py-5">
          <div className="flex flex-col item-center jstify-between text-xl text-ascente-1 pb-2 ">
            <div className='w-full relative '>
                <img src={CoverImage} className='w-full rounded-md' alt="" />
                <img src={NoProfile} className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full w-14 h-14' alt="" />
            </div>
            <div className='w-full flex justify-center items-center mt-8 flex-col'>
                <p className='font-semibold font-sans'>Muhamed Jasir</p>
                <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur</p>
                <button
                      className="bg-[#0444a4] mt-4 text-white py-1 px-6 rounded-full font-semibold text-sm"
                    >Edit Profile</button>
            </div>
          </div>
        </div>
        {/*Intrest Contryes */}
        <div className="w-full shadow-md bg-white rounded-lg px-6 py-5">
          <div className="flex item-center align-middle justify-between text-xl text-ascente-1 pb-2  border-b border-[#66666645] ">
            <span>Interested Countries</span>
            <IoMdAdd className='text-blue-700' />
          </div>
          <div className="w-full flex flex-col gap-1 pt-4">
           <p>india </p> 
           <p>uk </p> 
           <p>usa </p> 
          </div>
        </div>
      </div>
      {/* CENTER */}
      <div className="flex-1 h-full  px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
        <form
          className="shadow-md bg-white px-4 rounded-lg" onSubmit={handlePostSubmit}
        >
          <div className="w-full flex item-center gap-2 py-4 border-b border-[#66666645]">
            <img
              src={NoProfile}
              alt="UserImage"
              className="w-14 h-14 rounded-full object-cover"
            />
            <input
              className="w-full rounded-full py-1 bg-secondary bg-opacity-20  border  border-gray-300 outline-none text-sm font-light px-3 placeholder:text-[#666]"
              placeholder="Whats on your mind..."
              name="description"
              ref={description}
            />
          </div>
          {errMsg?.message && (
            <span
              role="alert"
              className={`text-sm ${
                errMsg?.status === "fail"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              }mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )}
          <div className="flex items-center justify-between py-4">
            <label
              htmlFor="imageUpload"
              className="flex items-center gap-1 text-base text-ascent-2 text-ascent-1 cursor-pointer"
            >
              <BiImages />
              <span>Image</span>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                data-max-size="5120"
                accept=".jpg,.png,.jpeg"
                onChange={handleImageUpload}
              />
            </label>

            <label
              htmlFor="videoUpload"
              className="flex items-center gap-1 text-base text-ascent-2 text-ascent-1 cursor-pointer"
            >
              <BiSolidVideo />
              <span>Video</span>
              <input
                type="file"
                id="videoUpload"
                className="hidden"
                data-max-size="5120"
                accept=".mp4,.wav"
              />
            </label>
            <label
              htmlFor="vgifUpload"
              className="flex items-center gap-1 text-base text-ascent-2 text-ascent-1 cursor-pointer"
            >
              <BsFiletypeGif />
              <span>Gif </span>
              <input
                type="file"
                id="vgifUpload"
                className="hidden"
                data-max-size="5120"
                accept=".gif"
              />
            </label>
            <div>
            {posting ? (
                    <Loading />
                  ) : (
                    <button
                      className="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    >Post</button>
                  )}
                </div>
              </div>
            </form>
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={users}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full item-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>
      {/* RIGHT */}
      <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col pl-5 bg-white rounded-lg shadow-md gap-3 overflow-y-auto">
      <div className="flex item-center text-xl text-ascente-1 pb-2 mt-2 border-b border-[#66666645] ">
            <span>Users</span>
          </div>
          <div className="w-full flex flex-col gap-5 pt-4">
            {users?.map((i)=>(
          <div key={i||i._id}  className="flex item-center justify-between">
                    <Link
                      to={`profile ${i?._id}`}
                      className="w-full flex gap-4 item-center cursor-pointer"
                    >
                      <img
                        src={i?.image ?? NoProfile}
                        alt={i?.first_name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {i?.first_name}
                        {i?.last_name}
                        </p>
                      </div>
                    </Link>
                    <div className="h-6 flex gap-1">
                    </div>
                  </div>
                  ))}
          </div>
      </div>
    </div>
  </div>
  )
}

export default Home