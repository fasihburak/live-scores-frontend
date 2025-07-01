import { baseUrl } from '../config';

export async function fetchCompetitions() {
  const res = await fetch(`${baseUrl}/api/competitions/`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch competitions');
  }
  const data = await res.json();
  return data.results || data;
}