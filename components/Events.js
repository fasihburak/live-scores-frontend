export function Events({ eventsDict }) {
  if (Object.keys(eventsDict).length === 0) return <div>Loading events...</div>;

  return ( 
    <ul>
      {Object.keys(eventsDict).map(key => (
        <li key={key} className='in-match-event'>
          {/* Render the event details. Adjust Event component to accept event prop */}
          <Event event={eventsDict[key]} />
        </li>
      ))}
    </ul> 
  );
}