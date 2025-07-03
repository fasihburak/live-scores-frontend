'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { baseUrl } from '../../../config';
import { SoccerBallIcon, CardIcon, SubstitutionIcon } from '../../../components/Icons';
import { fetchAllEvents } from '../../../lib/fetchAllEvents';
import { Score } from '../../../components/ScoreOnMatchPage';
import Substitution from '../../../components/Substitution.png'

function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getFullName(person) {
  const person_fullname = 
  `
  ${person.given_name} 
  ${person.middle_name ? person.middle_name.charAt(0) + '.' : ''} 
  ${person.family_name}
  `;
  return person_fullname;
}


function Event({ event }) {
  let header = 'Default Header';
  let Icon; 
  let person = event.person;
  let otherPlayerFullName;
  header = capitalizeFirstLetter(event.event_type);
  const personFullName = getFullName(person);

  if (header === 'Card') {
    const color = capitalizeFirstLetter(event.color);
    header = `${color} Card`;
    Icon = CardIcon;
  } else if (header === 'Goal') {
    Icon = SoccerBallIcon;
  } else if (header === 'Substitution') {
    Icon = () => (<Image src={Substitution} alt="Substitution" height={30}/>);
    otherPlayerFullName = getFullName(event.other_player);
  }


  return (
    <div className="event card m-2">
      <h5 className="card-header d-flex align-items-center">
        <span className="mx-1">
          {Icon === CardIcon ? <Icon color={event.color} /> : <Icon />}
        </span>
        <span className="mx-1">
          { header }
        </span>
        <span className="mx-1 ms-auto">
          { event.minute }'
        </span>
      </h5>
      <div className="card-body">
        {header === 'Substitution' ? (
          <>
            <h5 className="card-title">{otherPlayerFullName} <Icon /> {personFullName} </h5>
          </>
        ) : (
          <h5 className="card-title">{personFullName}</h5>
        )}

        {event.detail && (
          <p className="card-text">{event.detail}</p>
        )}
      </div>
    </div>
  )
}

function Events({ eventsDict }) {
  if (Object.keys(eventsDict).length === 0) return <div>Events will show up here...</div>;

  return ( 
    <ul className='events-list'>
      {Object.keys(eventsDict).map(key => (
        <li key={key} className='in-match-event'>
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
    <div className='container d-flex flex-column align-items-center'>
      <Score matchData={matchData} />
      <Events eventsDict={events} />
    </div>
    );
  }