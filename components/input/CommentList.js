import classes from './CommentList.module.css';

function CommentList({ items }) {
  return (
    <ul className={classes.comments}>
      {items.map((item) => {
        return (
          <li key={item._id}>
            <p>{item.comment.text}</p>
            <div>
              By <address>{item.comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
