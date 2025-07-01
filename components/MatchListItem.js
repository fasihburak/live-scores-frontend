import Link from 'next/link';
import ClientMatchTime from './ClientMatchTime';

export default function MatchListItem({ match }) {
  let match_status_info;
  if (match.status === 'ongoing') {
    match_status_info = null;
  }
  else if (match.status === 'scheduled') {
    match_status_info = `Scheduled for ${match.match_date}`;
  }
  else if (match.status === 'to_be_scheduled') {
    match_status_info = `TBA`;
  }
  else {
    match_status_info = match.status.charAt(0).toUpperCase() + match.status.slice(1);
  }
  console.log('match', match.status, match.match_date);
  return (
  <li className="list-group-item d-flex align-items-center match-item" key={match.id}>
    <Link href={`/match/${match.id}`} className="flex-grow-1 text-decoration-none">
      {match.first_team.name} ({match.first_team_goals_scored} - {match.second_team_goals_scored}) {match.second_team.name}
    </Link>
    <span className="match-status d-inline-flex align-items-center justify-content-end">
      { match.status === 'scheduled' && (
        <ClientMatchTime dateString={match.match_date} />
      )}
      {/* <span>{ match_status_info }</span> */}
      { match.status === 'ongoing' && (
        <>
          <div className="spinner-grow spinner-grow-sm text-danger me-2" role="status">
          </div>
          <span className="live-text">Live</span>
        </>
      )}
    </span>
  </li>
        );
}
            