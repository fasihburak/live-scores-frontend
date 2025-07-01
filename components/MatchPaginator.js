import Link from 'next/link';

export default function MatchPaginator({ totalPages, page, competitionId, status }) {
  return (
    <nav className='mt-4'>
      <ul className="pagination justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={`page-item${page === i + 1 ? ' active' : ''}`}>
            <Link
              className="page-link"
              href={`/matches?${competitionId ? `competition=${competitionId}&` : ''}${status ? `status=${status}&` : ''}page=${i + 1}`}
            >
              {i + 1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}