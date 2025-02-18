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

            <label for="total">Total a pagar (ARS):</label>
            <input type="number" v-model="totalPaid" step="0.01" readonly />

            <button type="submit">Comprar</button>
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
import { createTransaction } from '@/services/CriptoService';
import ModalsComponent from './ModalsComponent.vue';

const userStore = useUserStore();
const userName = computed(() => userStore.userName);
const cryptoPricesStore = useCryptoPricesStore();

const crypto = ref('');
const amount = ref('');
const unitPrice = ref(0);
const totalPaid = ref(0);
const loading = ref(false);
const successModal = ref(false);
const errorModal = ref(false);
const formError = ref('');

// Cargar precios al montar el componente
onMounted(async () => {
    try {
        await cryptoPricesStore.fetchPrices();
    } catch (error) {
        errorModal.value = true;
    }
});

// Obtener precio de la criptomoneda seleccionada
const fetchCryptoPrice = () => {
    if (!crypto.value) return;

    const priceData = cryptoPricesStore.prices[crypto.value];

    if (priceData?.ask) {
        unitPrice.value = priceData.ask;
        updatePrice();
    } else {
        formError.value = `No se pudo obtener el precio de ${crypto.value}`;
    }
};

// Actualizar total a pagar en ARS
const updatePrice = () => {
    totalPaid.value = amount.value && unitPrice.value 
        ? (amount.value * unitPrice.value).toFixed(2)
        : 0;
};

// Resetear formulario
const resetForm = () => {
    crypto.value = '';
    amount.value = '';
    unitPrice.value = 0;
    totalPaid.value = 0;
    formError.value = '';
};

// Enviar transacción
const submitTransaction = async () => {
    formError.value = '';

    if (amount.value <= 0 || totalPaid.value <= 0) {
        formError.value = 'Seleccione una criptomoneda y la cantidad a comprar';
        return;
    }

    const transaction = {
        user_id: userName.value,
        action: 'purchase',
        crypto_code: crypto.value,
        crypto_amount: amount.value,
        money: totalPaid.value,
        datetime: new Date().toISOString(),
    };

    loading.value = true;

    try {
        await createTransaction(transaction);
        successModal.value = true;
        resetForm();
    } catch (error) {
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
    background-color:  #410677;
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
</style>
