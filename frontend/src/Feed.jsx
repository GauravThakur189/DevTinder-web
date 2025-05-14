import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feeds = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  console.log("feed", feeds);
  const fetchFeed = async () => {
    if (feeds && feeds.length>0) return;
    try {
      const resonse = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(resonse.data));
      console.log("feed daya", resonse.data);
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

 return (
  <>
  {feeds && feeds.length > 0 ? (
    <>
      <div className="flex flex-col items-center gap-4 p-4 pb-2 text-2xl m-5  tracking-wide">
        {feeds.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>

      {/* You can render the first feed separately if needed
      <UserCard user={feeds[0]} /> */}
    </>
  ) : (
    <p>Loading...</p>
  )}
</>
 )
 
} ;
export default Feed;
