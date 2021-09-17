import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const QuoteList = props => {

  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get('sort') === 'asc';

  const changeSortingHandler = () => {
    history.push(`${location.pathname}?sort=${isSortingAscending ? 'desc' : 'asc'}`);
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {props.quotes
          .sort((a, b) => isSortingAscending ?
            a.text.localeCompare(b.text) :
            b.text.localeCompare(a.text))
          .map((quote) => (
            <QuoteItem
              key={quote.id}
              id={quote.id}
              author={quote.author}
              text={quote.text}
            />
          ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
