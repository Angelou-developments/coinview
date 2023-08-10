import axios from 'axios';
import create from 'zustand';
import debounce from '../helpers/debounce';

const homeStore = create((set) => ({    
    coins: [],
    trending: [],
    query: '',

    setQuery: (e) => {
        //set query value equal to input box string velue given by input event
        set({ query: e.target.value })
        // pass input value into searchCoins function to be used as search parameter
        homeStore.getState().searchCoins()
    },

    searchCoins: debounce(  async () => {
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

                set({ coins })
            } else {
                set({ coins: trending })
            }
        
    }, 500),

    fetchCoins:async () => {
        // fetch coin data from coingeck api
        const res = await axios.get('https://api.coingecko.com/api/v3/search/trending');

        const coins = res.data.coins.map(coin => {
            return {
                // retriev coin info and store it
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBtc: coin.item.proce_btc
            }
        })

        set({coins, trending: coins })
    }

}))

export default homeStore;