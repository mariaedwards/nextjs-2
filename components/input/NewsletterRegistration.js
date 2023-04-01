import classes from './NewsletterRegistration.module.css';
import { useRef } from 'react';
import { useContext } from 'react';
import NotificationContext from '@/store/NotificationContext';

async function registerUser(email) {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
}

function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationContext = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    notificationContext.showNotification({
      title: 'Signing up...',
      message: 'Thanks for signing up!',
      status: 'pending',
    });
    const email = emailRef.current.value;
    try {
      await registerUser(email);
      notificationContext.showNotification({
        title: 'Success!',
        message: 'Thanks for signing up!',
        status: 'success',
      });
    } catch (err) {
      notificationContext.showNotification({
        title: 'Error!',
        message: err.message,
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
