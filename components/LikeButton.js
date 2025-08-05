'use client';
 
import { useState } from 'react';
 
export default function LikeButton() {
  const [likes, setLikes] = useState(0);
 
  function handleClick() {
    setLikes(likes + 1);
    fetch(`${baseUrl}/api/matches/`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
  
  return <button onClick={handleClick}>Send request ({likes})</button>;
}