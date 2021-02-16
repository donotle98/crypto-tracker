import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SEARCH_COIN } from '../../config';
import styled from 'styled-components';

const EachCoin = () => {
    const [coin, setCoin] = useState(null);
    const [error, setError] = useState(null);
    let query = window.location.pathname.replace('/', '');
    let history = useHistory();

    const fetchCoinData = () => {
        axios
            .get(`${SEARCH_COIN}/${query}`)
            .then((res) => setCoin(res.data))
            .catch((e) => setError('That crypto cannot be found'));
    };

    useEffect(() => {
        fetchCoinData();
    }, [query]);

    if (error) {
        return (
            <StyledError>
                <div>
                    <h1>{error}</h1>
                    <footer>
                        <button onClick={() => history.goBack()}>Back</button>
                    </footer>
                </div>
            </StyledError>
        );
    }

    if (!coin) {
        return <h1>Loading...</h1>;
    }
    return (
        <StyledWrapper>
            <div>
                <div className='header'>
                    <img src={`${coin.image.small}`}></img>
                    <h1>
                        {coin.name} ({coin.symbol})
                    </h1>
                </div>

                <div className='links'>
                    <a href={`${coin.links.homepage[0]}`} target='_blank'>
                        Homepage
                    </a>
                    <a href={`${coin.links.blockchain_site[0]}`}>
                        Blockchain site
                    </a>
                </div>

                <div className='coin-data'>
                    <span>
                        Current Price: {coin.market_data.current_price.usd}
                    </span>
                    <span>24hr High: {coin.market_data.high_24h.usd}</span>
                    <span>24hr Low: {coin.market_data.low_24h.usd}</span>
                    <span>
                        Price change in 24hr:{' '}
                        {coin.market_data.price_change_24h_in_currency.usd}
                    </span>
                    <span>Market Cap: {coin.market_data.market_cap.usd}</span>
                </div>
            </div>
            <footer>
                <button onClick={() => history.goBack()}>Back</button>
            </footer>
        </StyledWrapper>
    );
};

export default EachCoin;

const StyledWrapper = styled.div`
    .header {
        display: flex;
        justify-content: center;
        img {
            padding-right: 0.5rem;
        }
    }

    .links {
        display: flex;
        justify-content: space-between;
        padding: 2rem;
        a {
            color: white;
        }
    }

    .coin-data {
        display: flex;
        flex-direction: column;
        span {
            font-size: 1.3rem;
            padding-left: 2rem;
            margin-bottom: 1rem;
        }
    }

    footer {
        position: fixed;
        bottom: 2rem;
        left: 2rem;

        button {
            font-size: 1.4rem;
        }
    }
`;

const StyledError = styled.div`
    text-align: center;

    h1 {
        color: red;
    }

    footer {
        text-align: center;
        margin-top: 2rem;
        button {
            font-size: 1.3rem;
        }
    }
`;
