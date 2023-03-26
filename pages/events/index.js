import { getAllEvents } from '../../dummy-data';
import EventsList from '../../components/events/EventsList';
import EventSearch from '../../components/events/EventSearch';
import { useRouter } from 'next/router';

function EventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventsList items={events} />
    </>
  );
}

export default EventsPage;
