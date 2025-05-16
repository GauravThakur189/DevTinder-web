import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "./requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  //console.log("requests", requests);

  const hadleRequest = async(status,id) => {
    try {
        const api = `http://localhost:3000/request/review/${status}/${id}` 
       const response = await axios.post(api,{},{
    withCredentials:true
   }) 
   //console.log("request response",response.data);
      dispatch(removeRequest(id));
    } catch (error) {
        console.log("error in accepting or rejecting request",error);
        
    }
   
  }

  const showRequests = async () => { 
    try {
      const response = await axios.get(
        "http://localhost:3000/user/request/received",
        { withCredentials: true }
      );
      //console.log("request response", response.data);
      dispatch(addRequest(response.data.data));
    } catch (error) {
      console.error(error);
    }  
  };

  useEffect(() => {
    showRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1>No requests found</h1>
  return (
    <div>
      {requests.length> 0 ? <div className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
        Follow Requests
      </div>: <div className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
         Request not found !
      </div> }
      {requests.map((request) => {
        const { firstName, lastName, about, _id,photoUrl } = request.fromUserId;
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
              <div className="ml-auto flex gap-2">
                <button className="btn btn-soft btn-error" onClick={()=>hadleRequest("rejected",request._id)}>Reject</button>
                <button className="btn btn-soft btn-accent" onClick={()=> hadleRequest("accepted",request._id)}>Accept</button>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Requests;
