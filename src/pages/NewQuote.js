import { Fragment, useEffect } from "react";
import { useHistory } from "react-router";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from '../lib/api';

const NewQuote = () => {

    const history = useHistory();
    const { sendRequest, status, error } = useHttp(addQuote);

    useEffect(() => {
        if (status === 'completed' && !error) {
            history.push('/quotes');
        }
    }, [status, history, error]);

    const addQuoteHanlder = quoteData => {
        sendRequest(quoteData);
    }

    return (
        <Fragment>
            <QuoteForm onAddQuote={addQuoteHanlder} />
            {status === 'pending' && <p className='centered'>Sending...</p>}
            {error && <p className='centered'>An error has ocurred: {error}</p>}
        </Fragment>
    );
}

export default NewQuote;