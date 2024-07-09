import { Link } from "react-router-dom"
import NoProfile from '../assets/defaultProfile.jpg'
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi"
import { MdDeleteOutline } from 'react-icons/md';
import { useState } from "react";
import { getPostComments, LikePost } from "../utils";
import CommentForm from "./CommentForm";
import ReplayCard from "./ReplayCart";
import Loading from "./Loading";
import moment from 'moment'
import api from "../utils/apiIntercepeors";
const PostCard = ({post,user,deletePost,likePost,fetchPost}) => {
  const [showAll,setShowAll]=useState(0)
  const [comments,setComments]=useState([])
  const [showComments,setShowComments]=useState(0)
  const [replayComments,setReplayComments]=useState(null);
  const [loading,setLoading]=useState(false)
  const [showReplay,setShowReplay]=useState(0);
  const getComments = async (id) => {
    setReplayComments(0)
    const result=await getPostComments(id)
    setComments(result)
  }
  const handleLike =async(uri)=>{
    await LikePost(uri)
    await getComments(post?._id)
    fetchPost()
    
  }
  const handleDelete=async(postId)=>{
    try {
      const response=await api.delete(`/post/${postId}`)
      if(response.status===200){
        fetchPost()
      }
    } catch (error) {
      console.error(error);
    }
  }
  const userId=localStorage.getItem('userId')
  return (
    <div className='mb-2 bg-white shadow-sm p-4 rounded-xl'>
        <div className='flex gap-3 items-center mb-2'>
            <div>
                <img src={post?.user_id?.profile_pic??NoProfile} alt={post?.user_id?.first_name} className='w-14 h-12  rounded-full' />
            </div>
            <div className='w-full flex justify-between'>
              <div className=''>
                  <p className='font-medium text-lg text-ascent-1'>
                    {post?.user_id?.first_name} {post?.user_id?.last_name}
                  </p>
                <span className='text-ascent-2'>{post?.location}</span>
              </div>
              {moment(post?.createdAt).fromNow()}
            </div>
        </div>
        <div>
          <p className='text-ascent-2'>
          {showAll === post?._id ? post.description : (post?.description.slice(0, 300) || post?.description)}
          {post?.description?.length> 301 && (showAll === post?._id ?(<span className='text-blue ml-2 font-mediu cursor-pointer' onClick={()=>setShowAll(0)}>Show Lees</span>):(<span className='text-blue ml-2 font-medium cursor-pointer' onClick={()=>setShowAll(post?._id)}>Show More</span>))}
          </p>
          {post?.image&&(
          <img src={post?.image} alt='postImage' className='w-full mt-2 rounded-lg' />
          )}
        </div>
        <div className='mt-4 flex justify-between item-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]'>
          <p className='flex gap-2 item-center text-base cursor-pointer'
          onClick={()=>handleLike('/post/'+post?._id)}>
            {post?.like?.includes(userId)?(
              <BiSolidLike size={20} color='blue' />
            ):(
              <BiLike size={20} />
            )}
            {post?.likes?.length} Likes
          </p>
          <p className='flex gap-2 item-center text-base cursor-pointer' onClick={()=>{setShowComments(showComments ===post._id?null:post._id);
            getComments(post?._id)}} >
            <BiComment size={20} />
            {post?.comment?.length}Comments
          </p>
          {
            userId===post?.user_id?._id && 
            <div className='flex gap-1 items-center text-base text-ascent-1 cursor-pointer' onClick={()=>handleDelete(post?._id)}>
              <MdDeleteOutline size={20} />
              <span>Delete</span>
            </div>
          }
        </div>

        {/* COMMENTS */}
        {showComments === post?._id && (
          <div className='w-full mt-4 border-t border-[#66666646]'>
            <CommentForm 
            user={user}
            postId={post?._id}
            getComments={()=>getComments(post?._id) }/>
            {loading?(<Loading />):(
              comments?.length>0?(
                comments?.map((c)=>(
                <div className='w-full py-2' key={c._id}>
                  <div className='flex gap-2 items-center mb-1'>
                    <div>
                      <img src={c?.user_id?.profile_pic??NoProfile} alt={c?.user_id?.first_name} className='w-10 h-10 rounded-full object-cover' />
                    </div>
                  <div>
                    <div>
                      <p className='font-medium text-base text-ascent-1'>
                        {c?.user_id?.first_name}{c?.user_id?.last_name}
                      </p>
                    </div>
                    <span className='text-ascent-2 '>
                    {moment(comments[0]?.createdAt).fromNow()}
                    </span>
                  </div>
                  </div>
                  <div className='ml-12'>
                    <p className='text-ascent-2'>{c?.comment}</p>
                    <div className='mt-2 flex gap-6'>
                      <span className='text-blue cursor-pointer' onClick={()=>setReplayComments(c?._id)}>
                        Reply
                      </span>
                    </div>
                    {replayComments ===c?._id&&(
                      <CommentForm user={user} postId={c?._id} replayAt={c?.from} getComments={()=>getComments(post?._id)} />
                    )}
                  </div>
                  {/* REPLIES */}
                  <div className='py-2 px-8 mt-6'>
                    {c?.replies?.length >0 &&(
                      <p className='text-base text-ascent-1 cursor-pointer' onClick={()=>setShowReplay(showReplay === c?.replies?._id ? 0 :c?.replies?._id)}>Show Replies({c?.replies?.length})</p>
                    )}
                    {
                      showReplay == c?.replies?._id &&
                      c?.replies?.map((reply)=>(
                        <ReplayCard reply={reply} user={user} key={reply?._id}  />
                      ))
                    }
                  </div>

                </div>))
              ):(
                <span className='flex text-sm py-4 text-ascent-2 text-center'>
                  No Comments ,be first to comment
                </span>
              )
            )}
          </div>
        )}
        
    </div>
    
  )
}

export default PostCard