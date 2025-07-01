import CompetitionListClient from './CompetitionListClient';
import { fetchCompetitions } from '../lib/fetchCompetitions';

export default async function CompetitionListServer() {
  const competitions = await fetchCompetitions();
  return <CompetitionListClient competitions={competitions} />;
}