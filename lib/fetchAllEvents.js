export const fetchAllEvents = async (eventsUrl) => {
  let eventsAccumulator = [];
  while (eventsUrl) {
    console.log('Fetching the events:', eventsUrl);
    const res = await fetch(eventsUrl);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    eventsAccumulator = eventsAccumulator.concat(data.results);
    eventsUrl = data.next;
  }
  return eventsAccumulator;
};