import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COIN_LIST, TOP_COINS } from '../../config';
import axios from 'axios';

const LandingPage = () => {
    const [coins, setCoins] = useState([]);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');

    const filteredCoins = results.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        axios.get(`${TOP_COINS}`).then((res) => setCoins(res.data.coins));
        axios.get(`${COIN_LIST}`).then((res) => setResults(res.data));
    }, []);

    if (!coins) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <StyledWrapper>
            <div>
                <div>
                    <h2>Top 7 trending coins from CoinGecko</h2>
                    <div>
                        {coins.map((coin, index) => {
                            return (
                                <Link to={`/${coin.item.id}`} key={index}>
                                    <div className='each-coin'>
                                        <img src={coin.item.thumb}></img>
                                        <span className='name'>
                                            {coin.item.name}
                                        </span>
                                        <span className='symbol'>
                                            {coin.item.symbol}
                                        </span>
                                        <span className='cap'>
                                            Market Cap:{' '}
                                            {coin.item.market_cap_rank}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className='search-bar'>
                        <input
                            type='text'
                            placeholder='Search a name.....'
                            name='search'
                            onChange={(e) => setSearch(e.target.value)}
                        ></input>
                    </div>

                    <div className='bot-sect'>
                        {filteredCoins.map((coin, index) => {
                            return (
                                <Link to={`/${coin.id}`} key={index}>
                                    <div className='each-coin'>
                                        <img src={`${coin.image}`}></img>
                                        <span>{coin.name}</span>
                                        <span>{coin.symbol}</span>
                                        <span>${coin.current_price}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};

export default LandingPage;

const StyledWrapper = styled.div`
    h2 {
        font-size: 1.2rem;
        text-align: center;
        margin-bottom: 2rem;
    }

    a {
        text-decoration: none;
        transition: 0.3s;
    }

    img {
        width: 1.5rem;
        height: 1.5rem;
    }

    .each-coin {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        width: 90%;
        margin: auto;
        margin-bottom: 1.5rem;
        color: white;
        transition: 0.3s;
        border-bottom: solid 1px gray;
    }

    .each-coin:hover {
        box-shadow: 0px 0px 10px #c5ffbf;
        transition: 0.3s;
    }

    .search-bar {
        text-align: center;
        margin-top: 4rem;
        margin-bottom: 2rem;
    }

    .bot-sect {
        min-height: 100vh;
    }
`;
