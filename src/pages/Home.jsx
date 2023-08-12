import React from 'react';
import homeStore from '../stores/homStore';
import Listitem from '../components/Listitem';
import Header from '../components/Header'

export default function Home() {

  const store = homeStore()

  React.useEffect(() => {
    store.fetchCoins()
  }, [])
  return (
    <div>
      <Header />
      <header className="home-search">
        <div className="width">
          <h2>Search for a coin</h2>
          <input type="text" value={store.query} onChange={store.setQuery} name="" id="" />
        </div>
      </header>
      <div className="home-cryptos">
        <div className="width">
          <div className="home-crypto-list">
            <h2>Trending coins</h2>
            {store.coins.map(coin => {
              return <Listitem key={coin.id} coin={coin} />;
            })}
          </div>
        </div>
      </div>
    </div>
  )
}