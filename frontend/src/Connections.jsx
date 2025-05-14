import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const Connections = () => {
    const connections = async()=>{
        try {
            const response = await axios.get('http://localhost:3000/user/connections',{
        withCredentials:true   
      })
      
      
      console.log("connection response data",response.data)
        } catch (error) {
          console.error(" Error fetching connections:", error);
        }
      
    }

    useEffect(()=>{
        connections()
    },[])
  return (
    <div className='flex flex-col items-center'>
    <div className="card card-side bg-base-200 shadow-sm m-5">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">New movie is released!</h2>
    <p>Click the button to watch on Jetflix app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Watch</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Connections