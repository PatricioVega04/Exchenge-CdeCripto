<template>
    <div class="assets-container">
        <div class="balance-header">
            <h2>Tu Portafolio</h2>
            <div class="total-balance">
                <span class="balance-label">Balance Total</span>
                <span class="balance-amount">${{ totalValueInPesos }}</span>
            </div>
        </div>

        <div class="assets-table">
            <table>
                <thead>
                    <tr>
                        <th>Criptomoneda</th>
                        <th>Cantidad</th>
                        <th>Valor en ARS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(balance, crypto, index) in filteredBalances" 
                        :key="crypto"
                        :class="{ 'row-even': index % 2 === 0 }">
                        <td class="crypto-cell">
                            <div class="crypto-info">
                                <img :src="`/imagenes-logo/${crypto.toLowerCase()}.png`" :alt="`${crypto} logo`" class="crypto-logo" >

                                <span class="crypto-name">{{ crypto.toUpperCase() }}</span>
                            </div>
                        </td>
                        <td class="amount-cell">{{ balance }}</td>
                        <td class="value-cell">${{ getCryptoValueInPesos(crypto, balance) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/store/useUserStore';
import { useCryptoBalanceStore } from '@/store/useCryptoBalanceStore';
import { useCryptoPricesStore } from '@/store/useCryptoPricesStore';

const userStore = useUserStore();
const cryptoBalanceStore = useCryptoBalanceStore();
const cryptoPricesStore = useCryptoPricesStore();

onMounted(async () => {
    try {
        await cryptoBalanceStore.fetchBalances(userStore.userName);
        await cryptoPricesStore.fetchPrices();
    } catch (error) {
        console.error('Error al obtener balances o precios:', error);
    }
});

const filteredBalances = computed(() => {
    const balances = cryptoBalanceStore.balances;
    return Object.fromEntries(
        Object.entries(balances).filter(([, amount]) => amount > 0)
    );
});

const getCryptoValueInPesos = (crypto, amount) => {
    const price = cryptoPricesStore.prices[crypto]?.bid || 0;
    return (price * amount).toFixed(2);
};

const totalValueInPesos = computed(() => {
    return Object.entries(filteredBalances.value).reduce((total, [crypto, amount]) => {
        const valueInPesos = getCryptoValueInPesos(crypto, amount);
        return total + parseFloat(valueInPesos);
    }, 0).toFixed(2);
});
</script>

<style scoped>
.assets-container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.balance-header {
    background: linear-gradient(135deg, #000000, #410677);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.balance-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
}

.total-balance {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.balance-label {
    font-size: 1rem;
    opacity: 0.9;
}

.balance-amount {
    font-size: 2.5rem;
    font-weight: 600;
}

.assets-table {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

thead {
    background-color: #f8f9fc;
}

th {
    padding: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    font-size: 1.1rem;
    border-bottom: 2px solid #eef0f5;
}

td {
    padding: 1.25rem;
    color: #2c3e50;
    font-size: 1.1rem;
    border-bottom: 1px solid #eef0f5;
}

.row-even {
    background-color: #f8f9fc;
}

.crypto-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.crypto-logo {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

.crypto-cell {
    font-weight: 600;
    padding: 0.75rem 1.25rem;
}

.crypto-name {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: rgba(65, 6, 119, 0.1);
    border-radius: 6px;
    color: #410677;
}

.amount-cell {
    font-family: 'Courier New', monospace;
}

.value-cell {
    font-weight: 600;
    color: #410677;
}

@media (max-width: 768px) {
    .balance-header {
        padding: 1.5rem;
    }

    .balance-amount {
        font-size: 2rem;
    }

    th, td {
        padding: 1rem;
        font-size: 1rem;
    }

    .crypto-logo {
        width: 24px;
        height: 24px;
    }

    .crypto-name {
        padding: 0.25rem 0.5rem;
    }
}

@media (max-width: 480px) {
    .assets-container {
        margin: 1rem auto;
    }

    .balance-header {
        padding: 1rem;
    }

    .balance-amount {
        font-size: 1.75rem;
    }

    th, td {
        padding: 0.75rem;
        font-size: 0.9rem;
    }

    .crypto-logo {
        width: 20px;
        height: 20px;
    }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.assets-container {
    animation: fadeIn 0.3s ease-out;
}
</style>

