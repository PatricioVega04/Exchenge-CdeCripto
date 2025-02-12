import { defineStore } from 'pinia';
import axios from 'axios';

export const useCryptoPricesStore = defineStore('cryptoPrices', {
    state: () => ({
        prices: {
            btc: { bid: null, ask: null },
            eth: { bid: null, ask: null },
            usdt: { bid: null, ask: null },
            pepe: { bid: null, ask: null },
            xrp: { bid: null, ask: null },
        },
        loading: false,
        error: null,
    }),
    actions: {
        async fetchPrices() {
            this.loading = true;
            this.error = null;
            try {
                const [btc, eth, usdt, pepe, xrp] = await Promise.all([
                    axios.get('https://criptoya.com/api/argenbtc/btc/ars'),
                    axios.get('https://criptoya.com/api/argenbtc/eth/ars'),                  
                    axios.get('https://criptoya.com/api/argenbtc/usdt/ars'),
                    axios.get('https://criptoya.com/api/argenbtc/pepe/ars'),
                    axios.get('https://criptoya.com/api/argenbtc/xrp/ars'),
                ]);

                this.prices.btc = { bid: btc.data.totalBid, ask: btc.data.totalAsk };
                this.prices.eth = { bid: eth.data.totalBid, ask: eth.data.totalAsk };
                this.prices.usdt = { bid: usdt.data.totalBid, ask: usdt.data.totalAsk };
                this.prices.pepe = { bid: pepe.data.totalBid, ask: pepe.data.totalAsk };
                this.prices.xrp = { bid: xrp.data.totalBid, ask: xrp.data.totalAsk };
            } catch (error) {
                this.error = 'Error al obtener los precios de las criptomonedas.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
});