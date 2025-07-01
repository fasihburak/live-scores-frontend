'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function StatusList() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status');
  // If a competition is selected, include it in the query string; otherwise, this remains empty.
  const competitionParam = searchParams.get('competition');
  const competitionQuery = competitionParam ? `competition=${competitionParam}&` : '';

  return (
    <nav className="sub-nav" data-bs-theme="light">
      <ul className="nav nav-underline p-3">
        <li className="nav-item">
          <Link className={`nav-link ${!statusParam ? 'active' : ''}`} href={`/matches?${competitionQuery}`}>All</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${statusParam === 'ongoing' ? 'active' : ''}`} href={`/matches?${competitionQuery}status=ongoing`}>Live</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${statusParam === 'scheduled' ? 'active' : ''}`} href={`/matches?${competitionQuery}status=scheduled`}>Upcoming</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${statusParam === 'finished' ? 'active' : ''}`} href={`/matches?${competitionQuery}status=finished`}>Completed</Link>
        </li>
      </ul>
    </nav>
  );
}