'use client';

export default function LiveIndicator() {
  return (
    <span className="d-inline-flex align-items-center">
      <span className="spinner-grow spinner-grow-sm text-danger me-2" role="status"></span>
      <span className="live-text">Live</span>
    </span>
  );
}