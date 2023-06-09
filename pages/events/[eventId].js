import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventContent from '../../components/event-detail/EventContent';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventSummary from '../../components/event-detail/EventSummary';
import Head from 'next/head';
import Comments from '@/components/input/Comments';

function EventPage(props) {
  const { event } = props;

  if (!event) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  return {
    paths: events.map((event) => ({
      params: {
        eventId: event.id,
      },
    })),
    fallback: true,
  };
}

export default EventPage;
