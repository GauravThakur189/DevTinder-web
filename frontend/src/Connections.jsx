import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from './connectionSlice'

const Connections = () => {
  const connections = useSelector((store) => store.connections)
  console.log("connections", connections);
  
  const dispatch = useDispatch()
    const fetchConnections = async()=>{
        try {
            const response = await axios.get('http://localhost:3000/user/connections',{
        withCredentials:true   
      })
      
      
      console.log("connection response data",response.data.data)
      dispatch(addConnection(response.data.data))
        } catch (error) {
          console.error(" Error fetching connections:", error);
        }
      
    }

    useEffect(()=>{
        fetchConnections()
    },[])

   if(!connections) return

   if(connections.length === 0) return (
    <div className='flex flex-col items-center'>
    <div className="card card-side bg-base-200 shadow-sm m-5">
    No Connections Found
    </div>
    </div>
   )


//   return (
//     <ul className="list bg-base-200 rounded-box shadow-md m-3">
//   {connections.map((connection) => (
//     <li
//       key={connection._id}
//       className="list-row flex items-center gap-4 p-3"
//     >
//       <img
//         className="size-10 rounded-box"
//         src={connection.photoUrl}
//         alt={`${connection.firstName}'s profile`}
//       />
//       <div>
//         <h2 className="card-title">{`${connection.firstName} ${connection.lastName}`}</h2>
//         <p>{connection.about}</p>
//       </div>
//     </li>
//   ))}
// </ul>

    
// //     <div className='flex flex-col items-center'>
// //     <div className="card card-side bg-base-200 shadow-sm m-5">
// //   <figure>
// //     <img
// //       src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
// //       alt="Movie" />
// //   </figure>
// //   <div className="card-body">
// //     <h2 className="card-title">New movie is released!</h2>
// //     <p>Click the button to watch on Jetflix app.</p>
// //     <div className="card-actions justify-end">
// //       <button className="btn btn-primary">Watch</button>
// //     </div>
// //   </div>
// // </div>
// // </div>
//   )
return (
    <div>
      {connections.length> 0 ? <div className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
        Connections
      </div>: <div className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
         No Connection Found!
      </div> }
      {connections.map((connection) => {
        const { firstName, lastName, about, _id,photoUrl } = connection;
        return (
          <ul
            key={_id}
            className="list bg-base-200 rounded-box shadow-md m-3"
          >
            <li className="list-row flex items-center gap-4 p-3">
              <img
                className="size-10 rounded-box"
                src={photoUrl}
              />
              <div>
                <div>{firstName + " " + lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {about}
                </div>
              </div>
              {/* <div className="ml-auto flex gap-2">
                <button className="btn btn-soft btn-error" onClick={()=>hadleRequest("rejected",request._id)}>Reject</button>
                <button className="btn btn-soft btn-accent" onClick={()=> hadleRequest("accepted",request._id)}>Accept</button>
              </div> */}
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default Connections