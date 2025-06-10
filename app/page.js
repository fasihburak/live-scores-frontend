'use client';

import { useState } from 'react';
import LikeButton from './like-button';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}
 
export default function Match() {
  const matchId = '9a828ff5-6046-4cf9-bfa9-7f3917d1b8c1';
  const [firstTeamGoals, setFirstTeamGoals] = useState(null);
  const [secondTeamGoals, setSecondTeamGoals] = useState(null);
  const [status, setStatus] = useState(null);

  fetch(`${baseUrl}/api/matches/${matchId}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

  
  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}