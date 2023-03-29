import { getAllEvents } from '../../helpers/api-util';
import EventsList from '../../components/events/EventsList';
import EventSearch from '../../components/events/EventSearch';
import { useRouter } from 'next/router';

function EventsPage(props) {
  const router = useRouter();
  const { events } = props;
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

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 1800,
  };
}

export default EventsPage;
