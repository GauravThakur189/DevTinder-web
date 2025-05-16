import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from './feedSlice';

const UserCard = ({user}) => {
    const {_id, firstName, lastName, about,photoUrl,age,gender} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async(status,userId)=>{
      try {
          const response = await axios.post('http://localhost:3000/request/send/'+status+ '/' + userId, {},{
            withCredentials:true,
          })
          //console.log("Response from server:", response.data);
          dispatch(removeUserFromFeed(userId))
      } catch (error) {
        console.error("Error sending request:", error);
        
      }
    }


  return (
   <div className="flex items-center  bg-base-100">
  <div className="card bg-base-300 w-96 shadow-sm justify-center">
    <figure>
      <img
        src={photoUrl}
        alt="photo"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
      <div className='flex'>
        <p className="text-sm text-gray-500">{age + " "}{gender}</p>
      </div>
      <p>{about}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-active btn-primary" onClick={() => handleSendRequest("pending", _id)}>Ignore</button>
        <button className="btn btn-active btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
      </div>
    </div>
  </div>
</div>

  )
}

export default UserCard