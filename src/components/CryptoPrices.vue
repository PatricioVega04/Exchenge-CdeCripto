<template>
    <div class="crypto-prices">
        <div class="crypto-list">
            <div v-for="(price, crypto) in prices" :key="crypto" class="crypto-item">
                <img :src="getImageUrl(crypto)" :alt="crypto" class="crypto-image" />
                <div class="crypto-info">
                    <p><strong>Venta:</strong> {{ price.ask }} ARS</p>
                    <p><strong>Compra:</strong> {{ price.bid }} ARS</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCryptoPricesStore } from '@/store/useCryptoPricesStore.js';

const cryptoPricesStore = useCryptoPricesStore();
const { prices, fetchPrices } = cryptoPricesStore;

onMounted(async () => {
    await fetchPrices();
});

const getImageUrl = (crypto) => {
    return require(`@/assets/imagenes-logo/${crypto}.png`);
};
</script>
<style scoped>
.crypto-prices {
    padding: 20px;
    background-color: #f4f4f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.crypto-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.crypto-item {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    width: 220px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.crypto-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.crypto-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-bottom: 10px;
}

.crypto-info p {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
}

.crypto-info p strong {
    color: #333;
}

@media (max-width: 768px) {
    .crypto-item {
        width: 150px;
    }
}

@media (max-width: 480px) {
    .crypto-item {
        width: 100%;
    }
}

</style>