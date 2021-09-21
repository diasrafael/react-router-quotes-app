import { useEffect, useRef } from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import { useParams } from 'react-router';


const NewCommentForm = (props) => {

  const { sendRequest, status, error } = useHttp(addComment);

  const params = useParams();
  const commentTextRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({commentData: {text:commentTextRef.current.value}, quoteId: params.quoteId})
  };

  useEffect(() => {
    if (status === 'completed' && !error)
    props.onCommentAdded();
  }, [status, error, props]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
