import { Link } from "react-router-dom"
import NoProfile from '../assets/defaultProfile.jpg'
import moment from "moment"
import { BiLike, BiSolidLike } from "react-icons/bi"
const ReplayCard = ({reply,user,handleLike}) => {
    return (
      <div className='w-full py-3 '>
          <div className='flex gap-3 items-center mb-1'>
              <div>
                  <img src={reply?.user_id?.profile_pic ??NoProfile} alt={reply?.user_id?.first_name} className='w-10 h-10 rounded-full object-cover' />
              </div>
              <div>
                  <div >
                      <p className='font-medium text-base text-ascent-1'>
                          {reply?.user_id?.first_name}{reply?.user_id?.last_name}
                      </p>
                  </div>
                  <span className='text-ascent-2 text-sm'>
                      {moment(reply?.createdAt).fromNow()}
                  </span>
              </div>
          </div>
          <div className='ml-12'>
            <p className='text-ascent-2'>{reply?.comment}</p>
            <div className='mt-2 flex gap-6'>
            </div>
          </div>
      </div>
    )
  }
  export default ReplayCard