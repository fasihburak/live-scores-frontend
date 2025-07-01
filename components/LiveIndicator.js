'use client';

export default function LiveIndicator() {
  return (
    <>
      <div className="spinner-grow spinner-grow-sm text-danger me-2" role="status">
      </div>
      <span className="live-text">Live</span>
    </>
  );
}