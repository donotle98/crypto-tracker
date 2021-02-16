import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import LandingPage from './components/LandingPage/LandingPage';
import EachCoin from './components/EachCoin/EachCoin';
import './App.css';

const App = () => {
    return (
        <StyledWrapper>
            <Router>
                <h1 className='title'>
                    <Link to='/'>The Crypto Tracker</Link>
                </h1>
                <Switch>
                    <Route exact path='/'>
                        <LandingPage />
                    </Route>
                    <Route exact path='/:item_id'>
                        <EachCoin />
                    </Route>
                </Switch>
            </Router>
        </StyledWrapper>
    );
};

export default App;

const StyledWrapper = styled.main`
    .title {
        text-align: center;
        width: 20rem;
        margin: auto;
        margin-top: 3rem;
        margin-bottom: 4rem;
        a {
            text-decoration: none;
            color: white;
            padding: 0.5rem;
            transition: 0.5s;
            border-radius: 3rem;
        }

        a:hover {
            box-shadow: 0px 0px 15px #c5ffbf;
            transition: 0.5s;
        }
    }
`;
