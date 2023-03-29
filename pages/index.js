import { getFeaturedEvents } from '@/helpers/api-util';
import EventsList from '../components/events/EventsList';
function HomePage(props) {
  const featuredEvents = props.featuredEvents;
  return (
    <div>
      <EventsList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
