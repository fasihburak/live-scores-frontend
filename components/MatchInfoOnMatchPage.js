"use client";

import ClientMatchStatusOrTimeInfo from "./ClientMatchStatusOrTimeInfo";
import LiveIndicator from "./LiveIndicator";

export default function MatchInfoOnMatchPage({ matchData }) {
// Convert match_date (assumed to be in ISO 8601 or UTC format) to user's local datetime
  const localDate = new Date(matchData.match_date);
  const formattedLocalDateTime = localDate.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
    // seconds are excluded by not specifying them
  });
  return (
      <div className='score-container d-flex flex-column align-items-center'>
        <div>
          <span> {formattedLocalDateTime} </span>
        </div>
        <div className="score">
          <span>{matchData.first_team_goals_scored}</span>
          <span> - </span>
          <span>{matchData.second_team_goals_scored}</span>
        </div>
        {matchData.status === "ongoing" && <LiveIndicator />}
      </div>
  );
}
