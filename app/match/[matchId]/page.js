'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { baseUrl } from '../../../config';
import TeamOnMatchPage from '../../../components/TeamOnMatchPage';
import MatchInfoOnMatchPage from '../../../components/MatchInfoOnMatchPage';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

function Score({ matchData }) {
  return (
    <div id='score-board' className='d-flex justify-content-around align-items-center'>
      <TeamOnMatchPage team={matchData.first_team} />
      <MatchInfoOnMatchPage matchData={matchData} />
      <TeamOnMatchPage team={matchData.second_team} />
    </div>
  );
}

const CardIcon = ({ color = "#FFD700" }) => (
  <svg
    width="24"
    height="32"
    viewBox="0 0 24 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="28"
      rx="2"
      fill={color} // Use the color prop dynamically
      stroke="#000"
      strokeWidth="2"
    />
  </svg>
);

const SoccerBallIcon = () => (
  <svg
    fill="#000000"
    version="1.1"
    viewBox="0 0 952.1 952.1"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
  >
    <g>
      <g>
        <path d="M812.55,139.4c-43.7-43.7-94.6-78-151.3-102C602.55,12.6,540.25,0,475.95,0c-64.2,0.1-126.5,12.6-185.2,37.5
          c-56.7,24-107.6,58.3-151.3,102c-43.7,43.7-78,94.6-102,151.3c-24.8,58.7-37.4,121-37.4,185.3c0,64.201,12.6,126.6,37.4,185.301
          c24,56.699,58.3,107.6,102,151.299c43.7,43.701,94.6,78,151.3,102c58.7,24.801,121,37.4,185.3,37.4
          c64.2,0,126.601-12.6,185.3-37.4c56.7-24,107.601-58.299,151.301-102c43.699-43.699,78-94.6,102-151.299
          c24.8-58.701,37.399-121,37.399-185.301c0-64.2-12.6-126.6-37.399-185.3C890.55,234,856.25,183.2,812.55,139.4z M212.55,107.5
          c4.3-3.3,8.5-6.8,12.9-9.9c23.1-16.2,48.7-29.3,74.7-40.2C355.55,34.2,415.75,22,475.95,22c40.1,0,81.2,5.4,119.899,16
          c-15.3,6.2-34,18-65.399,44.8c-26.101-2.8-52.5-2.9-79-0.4c-34.601,3.3-69.4,11-103.4,23c-30.7,10.8-55,23.1-71.4,32.5
          c-25.1-9-57.5-19.6-73.5-24.8C205.65,113.9,210.85,108.8,212.55,107.5z M646.15,226.5l-81.4,222.2l-195.3,37.5L208.05,319.5
          c10.9-75.6,62.7-142.6,62.7-142.6c0.3-0.2,34.1-24.6,88.3-43.5c31.601-11.1,63.8-18.2,95.9-21.2c26.2-2.4,52.3-2,78.1,1.1
          L646.15,226.5z M39.35,460.2c-5,32.3-6.1,65.8-3.5,99.5c-3.9-7.799-7-14.398-9.3-19.699c-3-20.9-4.5-42.301-4.5-64.1
          c0-67,14.5-130.7,40.6-188c-2.9,30-1.5,61.1,0.6,84.7C52.05,400.7,44.05,430,39.35,460.2z M78.85,633.301
          c-4.6-16.9-10-41.5-12.7-71c-3-33.301-2.1-66.4,2.9-98.101c3.8-24.3,9.9-47.899,18.3-70.6c32.9-27.8,76.5-44.1,100.6-51.6
          L346.35,505.6L329.75,684.9L174.95,736.6C135.55,707.6,103.35,669.199,78.85,633.301z M549.25,892.9
          c-34.5,22.6-121.7,28-157.1,29.299c-39-7.299-76.9-19.799-112.601-37c-31.2-15-60.8-33.6-87.8-55.398c0.5-0.9-4.2-48.602-4-66
          l156.4-52.201l180.5,78.1l24.899,102.9C549.35,892.801,549.25,892.9,549.25,892.9z M849.15,734.6
          C822.25,773.4,790.05,809.5,751.35,836.9c-36.3,25.6-84.899,34.4-128.1,41.5c-3.3,0.5-44.6,7.299-44.9,5.9l-24.899-103L680.55,649
          l168.3-15.5c2.601,26.801,6,65.9,8,89.801C854.25,727.1,851.75,730.9,849.15,734.6z M851.75,600c-0.6,1-1.2,2.1-1.8,3.301
          L682.35,618.699L592.15,460.9l81.6-222.7l115.2,7.3c24.5,20.5,46.2,43.3,64.6,67.9c23,30.9,40.9,64.8,53.101,100.7
          C893.85,525.301,864.35,580.699,851.75,600z M911.85,349.8c-9.899-19.1-21.5-37.5-34.6-55c-20.7-27.7-45.3-53.2-73.2-75.9
          c-5.1-25.3-19.1-65.1-56.7-106.9c0.7,0.5,1.4,1.1,2.101,1.6c2.3,1.7,4.5,3.5,6.8,5.2c25.9,20.4,49.5,43.5,70.4,68.9
          c38.8,47.3,68.1,102.2,85.3,161.1C911.85,349.2,911.85,349.5,911.85,349.8z" />
      </g>
    </g>
  </svg>
);

// Fetch all events for a specific match using while loop
const fetchAllEvents = async (eventsUrl) => {
  let eventsAccumulator = [];
  while (eventsUrl) {
    console.log('Fetching the events:', eventsUrl);
    const res = await fetch(eventsUrl);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    eventsAccumulator = eventsAccumulator.concat(data.results);
    eventsUrl = data.next; // if data.next is not null, loop continues
  }
  return eventsAccumulator;
};

function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

function Events({ eventsDict }) {
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

export default function Match() {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [events, setEvents] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get match details
    const matchUrl = `${baseUrl}/api/matches/${matchId}/`; // trailing slash added here
    console.log("Fetching the match:", matchUrl);
    fetch(matchUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(data => setMatchData(data))
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err);
      });
    
    // Get events for the match
    const initialEventsUrl = `${baseUrl}/api/in-match-events/?match=${matchId}`;
    fetchAllEvents(initialEventsUrl)
      .then(eventsArray => {
        const eventsDict = eventsArray.reduce((acc, event) => {
          acc[event.id] = event;
          return acc;
        }, {});
        console.log('Events dictionary:', eventsDict);
        setEvents(eventsDict);
      })
      .catch(err => {
        console.error("Error fetching in-match events:", err);
        setError(err);
      });


    // Establish WebSocket connection
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${matchId}/`);

    socket.onmessage = (message) => {
      const messageDict = JSON.parse(message.data);
      console.log('Type of incomingEvent:', typeof messageDict);
      console.log('Keys', Object.keys(messageDict));
      console.log('Incoming event:', messageDict);
      console.log('Message type', messageDict.message_type);

      if (messageDict.message_type === 'match') {
        setMatchData((prevData) => ({
          ...prevData,
          ...messageDict,
        }));
      } else if (messageDict.message_type === 'in_match_event') {
        if (messageDict.operation_type === 'delete') {
          // Remove the event from the dictionary
          setEvents((prevEvents) => {
              const { [messageDict.id]: _, ...otherEvents } = prevEvents;
              return otherEvents;
          });
        } else {
          // Update the corresponding event using destructuring
          setEvents((prevEvents) => {
            const { [messageDict.id]: oldEvent, ...otherEvents } = prevEvents;
            const newEvents = {
              ...otherEvents,
              [messageDict.id]: messageDict,
            };
            // Event may be updated with a new minute value, so that the events need to be sorted
            // Convert to array, sort, and then convert back to a dictionary
            const sortedEventsArray = Object.values(newEvents).sort((a, b) => b.minute - a.minute);
            const sortedEventsDict = sortedEventsArray.reduce((acc, event) => {
              acc[event.id] = event;
              return acc;
            }, {});
            return sortedEventsDict;
          });
        }
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.close();
    };




  }, [matchId]);


  if (error) return <div>Error: {error.message}</div>;
  if (!matchData) return <div>Loading...</div>;
  // if (Object.keys(events).length === 0) return <div>Loading events...</div>;
  return (
    <div className='container'>
      <div id='match'>
        <Header title={matchData.id} />
        <Score matchData={matchData} />
        {/* <LikeButton matchId={matchId} /> */}
        <Events eventsDict={events} />
      </div>
    </div>
    );
  }