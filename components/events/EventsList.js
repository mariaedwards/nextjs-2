import EventItem from './EventItem';
import classes from './EventsList.module.css';

function EventsList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((item) => {
        const { id, title, description, date, time, location, image } = item;
        return (
          <EventItem
            key={item.id}
            id={id}
            title={title}
            description={description}
            image={image}
            date={date}
            time={time}
            location={location}
          />
        );
      })}
    </ul>
  );
}

export default EventsList;
