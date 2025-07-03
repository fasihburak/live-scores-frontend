function Event({ event }) {
  let header = 'Default Header';
  let Icon; 
  let person = event.person;
  header = capitalizeFirstLetter(event.event_type);
  // console.log('Event', event);
  const person_fullname = 
  `
  ${person.given_name} 
  ${person.middle_name ? person.middle_name.charAt(0) + '.' : ''} 
  ${person.family_name}
  `;
  if (header === 'Card') {
    const color = capitalizeFirstLetter(event.color);
    header = `${color} Card`;
    Icon = CardIcon;
  }
  else if (header === 'Goal') {
    Icon = SoccerBallIcon;
  }

  return (
    <div className="card">
      <h5 className="card-header">
        <div className='card-header-icon'>
          {Icon === CardIcon ? <Icon color={event.color} /> : <Icon />}
        </div>
        <div className='card-header-text'>
          { header } 
        </div>
        <div className='card-header-minute'>
          { event.minute }' 
        </div>
      </h5>
      <div className="card-body">
        <h5 className="card-title">{ person_fullname }</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  )
}