import { Fragment, useEffect } from "react";
import { useParams, Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Comments from '../components/comments/Comments'
import HighlightedQuote from "../components/quotes/HighlightedQuote"
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';;

const QuoteDetail = () => {

    const match = useRouteMatch();
    const params = useParams();
    const { sendRequest, status, data, error } = useHttp(getSingleQuote);

    useEffect(() => {
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId]);

    return <Fragment>
            {status === 'pending' && <div className='centered'><LoadingSpinner/></div>}
            {error && <p className='centered'>An error has ocurred: {error}</p>}
            {data && <Fragment>
                <HighlightedQuote text={data.text} author={data.author} />
                <Switch>
                    <Route path={match.path} exact>
                        <div className='centered'>
                            <Link className='btn--flat' to={`${match.url}/comments`}>
                                Load Comments...
                            </Link>
                        </div>
                    </Route>
                    <Route path={`${match.path}/comments`}>
                        <Comments />
                    </Route>
                </Switch>   
            </Fragment>}
        </Fragment>
}

export default QuoteDetail;