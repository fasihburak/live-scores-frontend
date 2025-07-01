import Link from 'next/link';
import ClientMatchStatusOrTimeInfo from './ClientMatchStatusOrTimeInfo';

export default function MatchListItem({ match }) {
  console.log('match', match.status, match.match_date);
  return (
    <li className="list-group-item d-flex align-items-center match-item" key={match.id}>
      <Link href={`/match/${match.id}`} className="flex-grow-1 text-decoration-none">
        {match.first_team.name} ({match.first_team_goals_scored} - {match.second_team_goals_scored}) {match.second_team.name}
      </Link>
      <span className="match-status d-inline-flex align-items-center justify-content-end">
        <ClientMatchStatusOrTimeInfo dateString={match.match_date} status={match.status} />
      </span>
    </li>
  );
}
            