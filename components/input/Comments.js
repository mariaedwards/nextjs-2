import { useState, useEffect } from 'react';
import { useContext } from 'react';
import NotificationContext from '@/store/NotificationContext';
import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

async function registerComment(eventId, commentData) {
  const response = await fetch(`/api/comments/${eventId}`, {
    method: 'POST',
    body: JSON.stringify(commentData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
}

function Comments(props) {
  const { eventId } = props;

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const notificationContext = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    async function getComment(eventId) {
      notificationContext.showNotification({
        title: 'Loading...',
        message: 'Loading comments...',
        status: 'pending',
      });
      const response = await fetch(`/api/comments/${eventId}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }

      try {
        const data = await response.json();
        setComments(data.comments);
        notificationContext.showNotification({
          title: 'Success!',
          message: 'Comments are loaded',
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

    if (showComments) {
      getComment(eventId);
    }
  }, [showComments]);

  async function addCommentHandler(commentData) {
    notificationContext.showNotification({
      title: 'Signing up...',
      message: 'Thanks for signing up!',
      status: 'pending',
    });

    try {
      await registerComment(eventId, commentData);
      notificationContext.showNotification({
        title: 'Success!',
        message: 'Thanks for signing up!',
        status: 'success',
      });
      setComments((prevArray) => [
        ...prevArray,
        { comment: commentData, _id: new Date().toISOString() },
      ]);
    } catch (err) {
      notificationContext.showNotification({
        title: 'Error!',
        message: err.message,
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
