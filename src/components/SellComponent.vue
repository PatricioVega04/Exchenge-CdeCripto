<template>
    <div>
        <form @submit.prevent="submitTransaction" class="form">
            <label for="crypto">Criptomoneda:</label>
            <select v-model="crypto" @change="fetchCryptoPrice">
                <option value="" disabled>Seleccione una criptomoneda</option>
                <option value="btc">Bitcoin (BTC)</option>
                <option value="eth">Ethereum (ETH)</option>
                <option value="usdt">Tether (USDT)</option>
            </select>

            <label for="amount">Cantidad:</label>
            <input type="number" v-model="amount" @input="updatePrice" step="0.00001"/>

            <label for="total">Total a recibir (ARS):</label>
            <input type="number" v-model="totalReceived" step="0.01" readonly />

            <button type="submit">Vender</button>
            <p v-if="formError" class="error-message">{{ formError }}</p>
        </form>

        <ModalsComponent
            v-model:loading="loading"
            v-model:showSuccess="successModal"
            v-model:showError="errorModal"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/store/useUserStore';
import { useCryptoPricesStore } from '@/store/useCryptoPricesStore';
import { useCryptoBalanceStore } from '@/store/useCryptoBalanceStore';
import { createTransaction } from '@/services/CriptoService';
import ModalsComponent from './ModalsComponent.vue';

const userStore = useUserStore();
const userName = computed(() => userStore.userName);
const cryptoPricesStore = useCryptoPricesStore();
const cryptoBalanceStore = useCryptoBalanceStore();

const crypto = ref('');
const amount = ref('');
const unitPrice = ref(0);
const totalReceived = ref(0);
const loading = ref(false);
const successModal = ref(false);
const errorModal = ref(false);
const formError = ref('');

onMounted(async () => {
    try {
        await cryptoBalanceStore.fetchBalances(userName.value);
    } catch (error) {
        errorModal.value = true;
    }
});

const fetchCryptoPrice = async () => {
    if (!crypto.value) return;

    await cryptoPricesStore.fetchPrices();
    unitPrice.value = cryptoPricesStore.prices[crypto.value]?.bid;
    if (unitPrice.value) {
        updatePrice();
    } else {
        formError.value = 'Error al obtener el precio de la criptomoneda';
    }
};

const updatePrice = () => {
    if (amount.value && unitPrice.value) {
        totalReceived.value = (amount.value * unitPrice.value).toFixed(2);
    } else {
        totalReceived.value = 0;
    }
};

const resetForm = () => {
    crypto.value = '';
    amount.value = '';
    unitPrice.value = 0;
    totalReceived.value = 0;
    formError.value = '';
};

const submitTransaction = async () => {
    formError.value = '';

    if (amount.value <= 0 || totalReceived.value <= 0) {
        formError.value = 'Seleccione una criptomoneda y la cantidad a vender';
        return;
    }

    if (amount.value > cryptoBalanceStore.balances[crypto.value]) {
        formError.value = 'No tienes suficiente cantidad de la criptomoneda seleccionada';
        return;
    }

    const transaction = {
        user_id: userName.value,
        action: 'sale',
        crypto_code: crypto.value,
        crypto_amount: amount.value,
        money: totalReceived.value,
        datetime: new Date().toISOString(),
    };

    loading.value = true;

    try {
        await createTransaction(transaction);
        await cryptoBalanceStore.updateBalance(crypto.value, -amount.value);
        successModal.value = true;
        resetForm();
    } catch (error) {
        console.error('Error en la transacción:', error);
        errorModal.value = true;
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

label {
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
}

select, input {
    margin-bottom: 1.5rem;
    padding: 0.75rem;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #ffffff;
    color: #2c3e50;
    font-size: 1rem;
    transition: all 0.3s ease;
}

select:focus, input:focus {
    outline: none;
    border-color: #410677;
    box-shadow: 0 0 0 2px rgba(102, 1, 97, 0.1);
}

input[readonly] {
    background-color: #f5f7fa;
    cursor: not-allowed;
}

button {
    padding: 0.75rem 1.5rem;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #410677;
}

button:active {
    transform: translateY(1px);
}

.error-message {
    margin-top: 1rem;
    color: #f56c6c;
    font-size: 0.875rem;
    text-align: center;
}

@media (max-width: 480px) {
    .form {
        margin: 1rem;
        padding: 1rem;
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
</style>

