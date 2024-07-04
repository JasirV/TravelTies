import React, { useState } from 'react'
import TextInput from '../../components/TextInput'
import Loading from '../../components/Loading'
import { BsFiletypeGif, BsPersonFillAdd, BsPostcard } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";

const Home = () => {
    const [posting, setPosting] = useState(false);
    const [loading, setloading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
  return (
    <div className="home w-full px- lg:px-10 pb-20 2xl:px-40 bg-secondary bg-opacity-40 lg:rounded-lg h-screen overflow-hidden">
    {/* <TopBar /> */}
    <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
      {/* LIFT */}
      <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
        {/* Profile REQUEST */}
        <div className="w-full shadow-md bg-white rounded-lg px-6 py-5">
          <div className="flex item-center jstify-between text-xl text-ascente-1 pb-2  border-[#66666645]">
          </div>
          <div className="w-full flex flex-col gap-4 pt-4">
          </div>
        </div>
      </div>
      {/* CENTER */}
      <div className="flex-1 h-full  px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
        <form
          className="shadow-md bg-white px-4 rounded-lg"
        >
          <div className="w-full flex item-center gap-2 py-4 border-b border-[#66666645]">
            <img
            //   src={users?.photo ?? NoProfile}
              alt="UserImage"
              className="w-14 h-14 rounded-full object-cover"
            />
            <TextInput
              styles="w-full rounded-full py-5"
              placeholder="Whats on your mind..."
              name="description"
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
                <button>post</button>
              )}
            </div>
          </div>
        </form>
      </div>
      {/* RIGHT */}
      <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col bg-white rounded-lg shadow-md gap-6 overflow-y-auto">

      </div>
    </div>
  </div>
  )
}

export default Home