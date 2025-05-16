import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feeds = useSelector((state) => state.feed);
  const dispatch = useDispatch();
 
  const fetchFeed = async () => {
    if (feeds && feeds.length>0) return;
    try {
      const resonse = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(resonse.data));
     // console.log("feed daya", resonse.data);
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

 if (!feeds) return 
 
if(feeds.length === 0 || feeds.length<0) return <div className=" flex items-center justify-center p-4 pb-2 text-2xl opacity-60 tracking-wide">No New Users Found</div>

return (
  feeds  ? (
    <div className="flex items-center m-10">
    <UserCard user={feeds[0]}/></div>
  ) : (
    <p>Loading...</p>
  )
);
 

} ;
export default Feed;
