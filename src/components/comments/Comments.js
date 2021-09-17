import { useCallback, useEffect, useState } from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';
import { useParams } from 'react-router';

const Comments = () => {

  const params = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest, status, data: comments, error} = useHttp(getAllComments, true);

  useEffect(() => {
    sendRequest(params.quoteId)
  }, [sendRequest, params.quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const commentAddedHandler = useCallback(() => {
    sendRequest(params.quoteId);
    setIsAddingComment(false);
  },[])
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onCommentAdded={commentAddedHandler} />}
      {status === 'pending' && <div className='centered'><LoadingSpinner/></div>}
      {error && <p className='centered'>An error has ocurred: {error}</p>}
      {comments && <CommentsList comments={comments}/>}
    </section>
  );
};

export default Comments;
