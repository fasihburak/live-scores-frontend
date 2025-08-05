import Link from 'next/link';
import { fetchCompetitions } from '../../lib/fetchCompetitions';
import { baseUrl } from '../../config';
import MatchListItem from '../../components/MatchListItem';
import StatusList from '../../components/StatusList';
import MatchPaginator from '../../components/MatchPaginator';
import { Suspense } from 'react';

async function fetchMatches(competition, status, match_date_gt, match_date_lt, page = 1) {
  const queryParams = [];
  if (competition) queryParams.push(`competition=${competition}`);
  if (status) queryParams.push(`status=${status}`);
  if (match_date_gt) queryParams.push(`match_date_gt=${match_date_gt}`);
  if (match_date_lt) queryParams.push(`match_date_lt=${match_date_lt}`);
  queryParams.push(`page=${page}`);

  const url = `${baseUrl}/api/matches/?${queryParams.join('&')}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch matches");
  }
  return res.json();
}

export default async function MatchesPage({ searchParams }) {
  const params = await searchParams;
  const competitionId = params?.competition;
  const status = params?.status;
  const match_date_gt = params?.match_date_gt || new Date(Date.now() - 35 * 60 * 60 * 1000).toISOString();
  const match_date_lt = params?.match_date_lt;
  const page = Number(params?.page) || 1;
  const data = await fetchMatches(competitionId, status, match_date_gt, match_date_lt, page);
  const matches = data.results;

  let pageSize;
  if (data.next) {
    const nextPage = page + 1;
    pageSize = matches.length;
  }
  else {
    pageSize = (data.count - matches.length) / (page - 1);
  }
  const totalPages = Math.ceil(data.count / pageSize);

  let headerText;
  if (competitionId) {
    const competitionsList = await fetchCompetitions();
    for (const comp of competitionsList) {
      if (comp.id === competitionId) {
        headerText = `${comp.name}`;
        break;
      }
    }
  } else {
    headerText = ``;
  }
  if (status === 'ongoing') {
    headerText += ` Live`;
  } else if (status === 'scheduled') {
    headerText += ` Upcoming`;
  } else if (status === 'finished') {
    headerText += ` Completed`;
  } else {
    headerText += ` All`;
  }
  headerText = `${headerText} Matches`;

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="container-fluid p-0">
          <Suspense fallback={null}>
            <StatusList />
          </Suspense>
      </div>
      <div className="match-list align-self-start">
        <div>
            <h1 className='ms-3'>{headerText}</h1>
            {matches.length > 0 ? (
              <ul className="list-group list-group-flush">
                {matches.map(match => (
                  <MatchListItem key={match.id} match={match} />
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted">No matches found.</p>
            )}
        </div>
        <MatchPaginator totalPages={totalPages} page={page} competitionId={competitionId} status={status} />
      </div>
    </div>
  );
}