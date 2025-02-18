<template>
    <div class="container-edit">
        <LoadingModal v-if="loading" />
        <div v-else-if="transaction" class="transaction-edit">
            <h1>Editar Transacción</h1>
            <div class="crypto-header">
                <div class="crypto-title">
                    <p><strong class="text-1">C DE </strong><strong class="text-2">C</strong><strong class="text-1">RIPTO</strong></p>
                </div>
              
            </div>
            <form @submit.prevent="submitEdit" class="form">
                <div class="form-group">
                    <label for="crypto">Criptomoneda:</label>
                    <select v-model="transaction.crypto_code" id="crypto" required>
                        <option value="" disabled>Seleccione una criptomoneda</option>
                        <option value="btc">Bitcoin (BTC)</option>
                        <option value="eth">Ethereum (ETH)</option>
                        <option value="usdt">Tether (USDT)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="amount">Cantidad:</label>
                    <input v-model="transaction.crypto_amount" id="amount" type="number" step="0.00001" />
                </div>
                
                <div class="form-group">
                    <label for="money">Precio:</label>
                    <input v-model="transaction.money" id="money" type="number" step="0.01" />
                </div>
                
                <p v-if="errors" class="error-message">No puedes introducir valores menores a 0.</p>
                
                <div class="button-container">
                    <button type="button" class="btn-cancel" @click="cancelEdit">Cancelar</button>
                    <button type="submit" class="btn-save">Guardar Cambios</button>
                </div>
            </form>
        </div>
        <ModalsComponent 
            :loading="isLoading"
            :success="isSuccess"
            :error="isError"
            @close="handleCloseModal"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CriptoService from '@/services/CriptoService';


const route = useRoute();
const router = useRouter();
const transaction = ref(null);
const loading = ref(true);
const isLoading = ref(false);
const isSuccess = ref(false);
const isError = ref(false);
const errors = ref(false);

const fetchTransaction = async () => {
    try {
        const response = await CriptoService.get(`/transactions/${route.params.id}`);
        transaction.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error('Error al obtener la transacción:', error);
        loading.value = false;
    }
};

const validate = () => {
    errors.value = transaction.value.crypto_amount < 0 || transaction.value.money < 0;
};

const submitEdit = async () => {
    validate();
    if (errors.value) {
        return;
    }

    isLoading.value = true;
    try {
        await CriptoService
        .patch(`/transactions/${route.params.id}`, {
            crypto_code: transaction.value.crypto_code,
            crypto_amount: transaction.value.crypto_amount,
            money: transaction.value.money,
        });
        isLoading.value = false;
        isSuccess.value = true;
        router.push({ name: 'History' });
    } catch (error) {
        isLoading.value = false;
        isError.value = true;
        console.error('Error al actualizar la transacción:', error);
    }
};

const cancelEdit = () => {
    router.push({ name: 'History' });
};

const handleCloseModal = () => {
    isSuccess.value = false;
    isError.value = false;
    router.push({ name: 'History' });
};

onMounted(fetchTransaction);
</script>

<style scoped>
.container-edit {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
}

.transaction-edit {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 2rem;
}

h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2rem;
}

.crypto-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.crypto-title {
    text-align: center;
    margin-bottom: 0.5rem;
}

.crypto-logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
}

.text-1 {
    color: #410677;
}

.text-2 {
    color: #2c3e50;
}

.form {
    max-width: 500px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
}

select, input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 1rem;
    color: #2c3e50;
    transition: all 0.3s ease;
}

select:focus, input:focus {
    outline: none;
    border-color: #410677;
    box-shadow: 0 0 0 2px rgba(65, 6, 119, 0.1);
}

.error-message {
    color: #f56c6c;
    text-align: center;
    margin: 1rem 0;
    font-size: 0.9rem;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
}

.btn-cancel, .btn-save {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-cancel {
    background-color: #909399;
    color: white;
}

.btn-save {
    background-color: #410677;
    color: white;
}

.btn-cancel:hover, .btn-save:hover {
    opacity: 0.8;
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    .container-edit {
        margin: 1rem;
        padding: 1rem;
    }

    .transaction-edit {
        padding: 1rem;
    }

    .button-container {
        flex-direction: column;
    }

    .btn-cancel, .btn-save {
        width: 100%;
    }
}
</style>

