import { getFeaturedEvents } from '@/helpers/api-util';
import EventsList from '../components/events/EventsList';
import Head from 'next/head';

function HomePage(props) {
  const featuredEvents = props.featuredEvents;
  return (
    <div>
      <Head>
        <title>NextEvents | Featured Events</title>
        <meta
          name="description"
          content="NextEvents offers you a lot of events to network and learn."
        />
      </Head>
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
