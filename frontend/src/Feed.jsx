import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  console.log("feed", feed);
  const fetchFeed = async () => {
    if (feed && feed.length>0) return;
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

 return feed.length > 0 ? (
    <UserCard user={feed[0]} />
  ) : (
    <p>Loading...</p>
  );
};
export default Feed;
