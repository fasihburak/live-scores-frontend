import CompetitionListClient from './CompetitionListClient';
import { fetchCompetitions } from '../lib/fetchCompetitions';
import { Suspense } from 'react';

export default async function CompetitionListServer() {
  const competitions = await fetchCompetitions();
  return (
    <Suspense fallback={null}>
      <CompetitionListClient competitions={competitions} />
    </Suspense>
  );
} 