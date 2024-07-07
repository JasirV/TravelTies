import api from "./apiIntercepeors";

export const getPostComments=async(id) =>{
    try {
      const res=await api.get(`/comments/${id}`)
      return res?.data?.data
    } catch (error) {
      console.log(error);
    }
    }

export const LikePost=async (uri)=>{
  const userId=localStorage.getItem('userId')
  try {
    const response=await api.post(`${uri}`,{userId})
    return response
  } catch (error) {
    console.error(error);
  }
}



