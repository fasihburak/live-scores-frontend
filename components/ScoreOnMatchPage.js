import TeamOnMatchPage from './TeamOnMatchPage';
import MatchInfoOnMatchPage from './MatchInfoOnMatchPage';

export function Score({ matchData }) {
  return (
    <div id='score-board' className='d-flex justify-content-around align-items-center'>
      <TeamOnMatchPage team={matchData.first_team} />
      <MatchInfoOnMatchPage matchData={matchData} />
      <TeamOnMatchPage team={matchData.second_team} />
    </div>
  );
}