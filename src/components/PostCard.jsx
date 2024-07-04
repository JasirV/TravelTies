const PostCard = ({post,user,deletePost,likePost}) => {
  return (
    <div className='mb-2 bg-primary p-4 rounded-xl'>
        <div className='flex gap-3 items-center mb-2'>
            <Link>
                <img src={post?.userId?.photo??NoProfile} alt={post?.userId?.firstName} className='w-14 h-14 object-cover rounded-full' />
            </Link>
            <div className='w-full flex justify-between'>
              <div className=''>
                <Link to={`/profile/${post?.userId?._id}`}>
                  <p className='font-medium text-lg text-ascent-1'>
                    {post?.userId?.firstName} {post?.userId?.lastName}
                  </p>
                </Link>
                <span className='text-ascent-2'>{post?.userId?.lastName}</span>
              </div>
              {follow?
              <span className='text-ascent-2'>{post && moment(post.createAt).fromNow()}</span>:
              <span className='text-ascent-1 text-blue font-semibold'>Add Friend</span>
            }
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
          onClick={()=>handleLike('/post/like/'+post?._id)}>
            {post?.likes?.includes(user?._id)?(
              <BiSolidLike size={20} color='blue' />
            ):(
              <BiLike size={20} />
            )}
            {post?.likes?.length} Likes
          </p>
          <p className='flex gap-2 item-center text-base cursor-pointer' onClick={()=>{setShowComments(showComments ===post._id?null:post._id);
          getComments(post?._id)}}>
            <BiComment size={20} />
            {post?.comment?.length}Comments
          </p>
          {
            user?._id===post?.userId?._id && 
            <div className='flex gap-1 items-center text-base text-ascent-1 cursor-pointer' onClick={()=>deletePost(post?._id)}>
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
                    <Link to={`/profile/${c?.userId}._id`}>
                      <img src={c?.userId?.photo??NoProfile} alt={c?.userId?.firstName} className='w-10 h-10 rounded-full object-cover' />
                    </Link>
                  <div>
                    <Link to={`/profile/${c?.userId?._id}`}>
                      <p className='font-medium text-base text-ascent-1'>
                        {c?.userId?.firstName}{c?.userId?.lastName}
                      </p>
                    </Link>
                    <span className='text-ascent-2 hidden md:flex'>
                    {c && moment(c?.createAt).fromNow()}
                    </span>
                  </div>
                  </div>
                  <div className='ml-12'>
                    <p className='text-ascent-2'>{c?.comment}</p>
                    <div className='mt-2 flex gap-6'>
                      <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer' 
                      onClick={()=>handleLike('/post/likeComment/'+c?._id)}
                      >{c?.likes?.includes(user?._id)?(
                        <BiSolidLike size={20} color='blue'/>
                      ):(
                        <BiLike size={20} />
                      )}
                      {c?.likes?.length} Likes</p>
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
                        <ReplayCard reply={reply} user={user} key={reply?._id} handleLike={()=>handleLike(`/posts/like-comment/${c?._id}/${reply?._id}`)} />
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