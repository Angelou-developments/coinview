import React from 'react';
import homeStore from '../stores/homStore';
import Listitem from '../components/Listitem';
import Header from '../components/Header'

export default function Home() {

  const store = homeStore()

  React.useEffect(() => {
    if(store.trending.length === 0) store.fetchCoins()
  }, [])
  return (
    <div>
      <Header />
      <header className="home-search">
        <div className="width">
          <h2>Search for a coin</h2>
          <div className={ store.searching ? "home-search-input searching" : "home-search-input" }>
            <input type="text" value={store.query} onChange={store.setQuery} name="" id="" />
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>
            </svg>
          </div>
        </div>
      </header>
      <div className="home-cryptos">
        <div className="width">
          <h2>{ store.searched ? "Search results" : "Trending coins" }</h2>
          <div className="home-cryptos-list">
            {store.coins.map(coin => {
              return <Listitem key={coin.id} coin={coin} />;
            })}
          </div>
        </div>
      </div>
    </div>
  )
}