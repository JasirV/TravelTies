import api from "./apiIntercepeors";

export const getPostComments=async(id) =>{
    try {
      const res=await api.get(`/comments/${id}`)
      return res?.data?.data
    } catch (error) {
      console.log(error);
    }
    }
