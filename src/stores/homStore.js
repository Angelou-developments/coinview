import axios from 'axios';
import { create } from 'zustand';
import debounce from '../helpers/debounce';

const homeStore = create((set) => ({    
    coins: [],
    trending: [],
    query: '',
    searching: false,
    searched: false,

    setQuery: (e) => {
        //set query value equal to input box string velue given by input event
        set({ query: e.target.value })
        // pass input value into searchCoins function to be used as search parameter
        homeStore.getState().searchCoins()
    },

    searchCoins: debounce(  async () => {
            set({ searching: true });
            const {query, trending} = homeStore.getState()
            if(query.length > 2) {
                const res = await axios.get(
                    `https://api.coingecko.com/api/v3/search?query=${query}`
                )
    
                const coins = res.data.coins.map(coin => {
                    return {
                        name: coin.name,
                        image: coin.large,
                        id: coin.id
                    }
                })

                set({ coins, searching: false, searched: true, })
            } else {
                set({ coins: trending, searching: false, searched: false, })
            }
        
    }, 500),

    fetchCoins:async () => {
        // simultaneously fetch coin data from coingeck api
        const [res, btcRes] = await Promise.all([
            axios.get('https://api.coingecko.com/api/v3/search/trending'),
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
        ])

        console.log("in here")

        const btcPrice = btcRes.data.bitcoin.usd
        console.log(btcPrice)

        const coins = res.data.coins.map((coin) => {
            return {
                // retriev coin info and store it
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBtc: coin.item.price_btc.toFixed(10),
                priceUsd: (coin.item.price_btc * btcPrice).toFixed(10),
            }
        })

        console.log(coins)

        set({coins, trending: coins })
    }

}))

export default homeStore;