import axios from 'axios';
import create from 'zustand';

const homeStore = create((set) => ({    
    coins: [],

    fetchCoins: async () => {
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

        set({coins})
    }

}))

export default homeStore;