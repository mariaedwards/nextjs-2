import Image from 'next/image';
import classes from './EventItem.module.css';
import Button from '../ui/Button';
import DateIcon from '../icons/DateIcon';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';

function EventItem(props) {
  const { title, image, date, location, id } = props;
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const transformedLocation = location.replace(/, /g, '\n');
  return (
    <li className={classes.item}>
      <Image src={`/${image}`} alt={title} width="300" height="300" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h3>{title}</h3>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{transformedLocation}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button href={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
