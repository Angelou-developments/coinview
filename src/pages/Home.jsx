import React from 'react';
import homeStore from '../stores/homStore';
import { Link } from 'react-router-dom';

export default function Home() {

  const store = homeStore()

  React.useEffect(() => {
    store.fetchCoins()
  }, [])
  return (
    <div>
      <input type="text" value={store.query} onChange={store.setQuery} name="" id="" />
      {store.coins.map(coin => {
        return (
          <div key={coin.id}>
            <Link to={`/${coin.id}`}>
              {coin.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}