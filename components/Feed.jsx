"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const {data:session} = useSession();
  const user = session?.user.id;

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt");
      console.log("Response", response)
      const data = await response.json();
      console.log("Data", data)
      setAllPosts(data);  
    })()
    console.log("UseEffect called")
  }, [user]);

  return (
    <section className='feed'>
      <PromptCardList data={allPosts} />
    </section>
  );
};

export default Feed;