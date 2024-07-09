import { useRef, useState } from "react";
import api from "../utils/apiIntercepeors";
import Loading from "./Loading";
import { getPostComments } from "../utils";
import NoProfile from '../assets/defaultProfile.jpg'

const CommentForm=({user,postId,replayAt,getComments})=>{
    const [loading,setLoading]=useState(false)
    const [errMsg,setErrMsg]=useState("")
    const commentRef=useRef(null)
    let userId=localStorage.getItem('userId')
    const onSubmit= async (data)=>{
        data.preventDefault();
      setLoading(true)
      setErrMsg("");
      try {
        const URL =!replayAt? `comments/${postId}/`: `comments/replayComment/${postId}`;
        const comment = commentRef.current.value;
        const newData={comment:comment,
        from:`${user[0]?.first_name} ${user[0]?.last_name}`,
        userId:userId,
        replayAt:replayAt,};
        const res=await api.post(`/${URL}`,newData)
        getComments()
        if(res?.status=='fail'){
          setErrMsg(res)
        }else{
          
        setErrMsg('')
        await getPostComments(postId)
      }
      setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
        
      }
    }

    return  (<form className='w-full border-b border-[#66666645] '  onSubmit={onSubmit}>
    <div className='w-full flex items-center gap-2 py-4'>
      <img src={user[0]?.profile_pic?? NoProfile} alt='UserImage' className='w-10 h-10 rounded-full object-cover' />
      <input ref={commentRef} name='comment' className="w-full rounded-full px-3 bg-secondary bg-opacity-25 py-3" placeholder={replayAt?`Replay @${replayAt}`:"Comment this Post"}/>
    </div>
    {errMsg?.message &&(
      <span role='alert' className={`text-sm${errMsg?.status ==="fail" ?"text-[#f64949fe]":"text-[#2ba150fe]"} mt-0.5`}>
        {errMsg?.message}
      </span>
    )}
    <div className='flex items-end justify-end pb-2'>
      {loading?(
        <Loading />
      ):(
        <button  type="submit" className='bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm'>Submit</button>
      )}
    </div>
    </form>
    )
  }
  export default CommentForm