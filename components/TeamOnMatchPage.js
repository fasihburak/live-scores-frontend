
export default function TeamOnMatchPage({ team }) {
    return (
        <div className="match-details-team">
            <img className='match-details-team-logo' src={team.logo} alt={team.name} />
            <p className='match-details-team-name'>{team.name}</p>
        </div>
    );
}