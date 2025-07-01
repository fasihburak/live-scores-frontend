'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CompetitionListClient({ competitions }) {
  const searchParams = useSearchParams();
  const activeCompetition = searchParams.get('competition');

  return (
    <>
      <li className="nav-item">
        <Link 
          className={`nav-link ${!activeCompetition ? 'active' : ''}`}
          href="/matches"
        >
          All Competitions
        </Link>
      </li>
      {competitions.map((competition) => (
        <li key={competition.id} className="nav-item">
          <Link 
            className={`nav-link competition-link ${activeCompetition === String(competition.id) ? 'active' : ''} text-wrap`}
            href={`/matches/?competition=${competition.id}`}
          >
            {competition.name}
          </Link>
        </li>
      ))}
    </>
  );
}