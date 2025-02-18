<template>
    <div>
        <LoadingModal v-if="loading"/>
        <ul v-else class="transaction-list">
            <li v-for="transaction in transactions" :key="transaction._id" class="transaction-item">
                <div class="transaction-info">
                    <div class="crypto-info">
                        <img 
                            :src="require(`@/assets/imagenes-logo/${transaction.crypto_code.toLowerCase()}.png`)" 
                            :alt="transaction.crypto_code"
                            class="crypto-logo"
                        >
                        <div>
                            <p>{{ getTransactionType(transaction.action) }} de <strong>{{ transaction.crypto_amount }}</strong> {{ transaction.crypto_code }}</p>
                            <p>$ {{ transaction.money }}</p>
                        </div>
                    </div>
                </div>
                <div class="transaction-actions">
                    <button class="btn-view" @click="viewTransaction(transaction._id)">
                        <i class="fa-solid fa-eye"></i>
                        <span class="tooltip-text">Ver Transacción</span>
                    </button>
                    <button class="btn-edit" @click="editTransaction(transaction._id)">
                        <i class="fa-solid fa-file-pen"></i>
                        <span class="tooltip-text">Editar Transacción</span>
                    </button>
                    <button class="btn-delete" @click="deleteTransaction(transaction._id)">
                        <i class="fa-solid fa-trash"></i>
                        <span class="tooltip-text">Eliminar Transacción</span>
                    </button>
                </div>
            </li>
        </ul>
        <p v-if="transactions.length === 0 && !loading" class="no-transactions">No hay movimientos registrados.</p>
        <LoadingModal v-if="deleteLoading" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/CriptoService';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'vue-router';
import LoadingModal from '@/components/ModalsComponent';

const transactions = ref([]);
const loading = ref(true);
const deleteLoading = ref(false);
const userStore = useUserStore();
const router = useRouter();

const fetchTransactions = async () => {
    try {
        const response = await apiClient.get(`/transactions?q={"user_id":"${userStore.userName}"}`);
        transactions.value = response.data;
    } catch (error) {
        console.error('Error al obtener los movimientos:', error);
    } finally {
        loading.value = false;
    }
};

const viewTransaction = (id) => {
    router.push({ name: 'TransactionDetail', params: { id } });
};

const editTransaction = (id) => {
    router.push({ name: 'TransactionEdit', params: { id } });
};

const deleteTransaction = async (id) => {
    deleteLoading.value = true;
    try {
        await apiClient.delete(`/transactions/${id}`);
        fetchTransactions(); 
    } catch (error) {
        console.error('Error al eliminar la transacción:', error);
    } finally {
        deleteLoading.value = false;
    }
};

const getTransactionType = (action) => {
    return action === 'purchase' ? 'Compra' : 'Venta';
};

onMounted(fetchTransactions);
</script>

<style scoped>
.transaction-list {
    list-style: none;
    padding: 0;
    margin: 2rem auto;
    max-width: 800px;
}

.transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.transaction-item:hover {
    transform: translateY(-2px);
}

.transaction-info {
    flex-grow: 1;
}

.transaction-info p {
    margin: 0.25rem 0;
    color: #2c3e50;
}

.transaction-info strong {
    color: #409eff;
}

.transaction-actions {
    display: flex;
    gap: 0.5rem;
}

.btn-view, .btn-edit, .btn-delete {
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
}

.btn-view {
    background-color: #409eff;
    color: white;
}

.btn-edit {
    background-color: #67c23a;
    color: white;
}

.btn-delete {
    background-color: #f56c6c;
    color: white;
}

.btn-view:hover, .btn-edit:hover, .btn-delete:hover {
    opacity: 0.8;
    transform: translateY(-1px);
}

.tooltip-text {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #2c3e50;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.btn-view:hover .tooltip-text,
.btn-edit:hover .tooltip-text,
.btn-delete:hover .tooltip-text {
    opacity: 1;
    visibility: visible;
    bottom: -35px;
}

.no-transactions {
    text-align: center;
    color: #909399;
    margin-top: 2rem;
    font-size: 1.1rem;
}

.crypto-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.crypto-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

@media (max-width: 768px) {
    .transaction-list {
        margin: 1rem;
    }

    .transaction-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .transaction-actions {
        width: 100%;
        justify-content: flex-end;
    }

    .crypto-info {
        width: 100%;
    }
}
</style>

