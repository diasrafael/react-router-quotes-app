import { Fragment, useEffect } from "react";
import LoadingSpinner from '../components/UI/LoadingSpinner';
import QuoteList from "../components/quotes/QuoteList";
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

const AllQuotes = () => {

    const {sendRequest, status, data: quotes, error} = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    return (
    <Fragment>
        {status === 'pending' && <div className='centered'><LoadingSpinner/></div>}
        {error && <p className='centered'>An error has ocurred: {error}</p>}
        {quotes && <QuoteList quotes={quotes} />}
    </Fragment>
    );
}

export default AllQuotes;