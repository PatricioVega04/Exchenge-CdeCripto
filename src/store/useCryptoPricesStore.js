import { defineStore } from 'pinia';
import axios from 'axios';

export const useCryptoPricesStore = defineStore('cryptoPrices', {
    state: () => ({
        prices: {
            btc: { bid: null, ask: null },
            eth: { bid: null, ask: null },
            usdt: { bid: null, ask: null },
           
        },
        loading: false,
        error: null,
    }),
    actions: {
        async fetchPrices() {
            this.loading = true;
            this.error = null;
        
            const cryptos = ['btc', 'eth', 'usdt'];
            const baseURL = 'https://criptoya.com/api/argenbtc/';
        
            try {
                const responses = await Promise.all(
                    cryptos.map(crypto => 
                        axios.get(`${baseURL}${crypto}/ars`).catch(error => ({ error, crypto }))
                    )
                );
        
                responses.forEach((response, index) => {
                    const crypto = cryptos[index];
                    if (response.error) {
                        console.error(`Error al obtener ${crypto}:`, response.error);
                        this.error = `Error al obtener ${crypto}`;
                    } else {
                        this.prices[crypto] = { bid: response.data.totalBid, ask: response.data.totalAsk };
                    }
                });
        
            } catch (error) {
                this.error = 'Error al obtener los precios de las criptomonedas.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        
    },
});