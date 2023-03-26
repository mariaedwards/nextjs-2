import { getFilteredEvents } from '../../dummy-data';
import EventsList from '../../components/events/EventsList';
import { useRouter } from 'next/router';

function FilteredEventsPage() {
  const router = useRouter();
  const filteredData = router.query.slug;
  if (!filteredData) {
    return <p>Loading...</p>;
  }
  const [year, month] = filteredData;
  const numYear = Number(year);
  const numMonth = Number(month);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numMonth < 1 ||
    numMonth > 12 ||
    numYear < 2021 ||
    numYear > 2030
  ) {
    return <p>Invalid year or month</p>;
  }
  const events = getFilteredEvents({ year: numYear, month: numMonth });
  if (!events || events.length === 0) {
    return <p>No Events</p>;
  }

  return (
    <>
      <EventsList items={events} />
    </>
  );
}

export default FilteredEventsPage;
