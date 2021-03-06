import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import SearchBooks from './pages/searchbooks';
import SavedBooks from './pages/savedbooks';
import Navbar from './components/navbar';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('id_token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const httpLink = createHttpLink({
    uri: '/graphql',
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={SearchBooks} />
                        <Route exact path='/saved' component={SavedBooks} />
                        <Route render={() => <h2 className='display-2'>Wrong page</h2>} />
                    </Switch>
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;