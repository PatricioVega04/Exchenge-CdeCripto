<template>
    <div class="container-detail">
        <LoadingModal v-if="loading" />
        <div v-else-if="transaction" class="transaction-details">
            <h1>Detalles de la Transacción</h1>
            <div class="crypto-header">
                <div class="crypto-title">
                    <p><strong class="text-1">C DE </strong><strong class="text-2">C</strong><strong class="text-1">RIPTO</strong></p>
                </div>
                <img 
                    :src="require(`@/assets/imagenes-logo/${transaction.crypto_code.toLowerCase()}.png`)" 
                    :alt="transaction.crypto_code"
                    class="crypto-logo"
                />
            </div>
            <div class="transaction-info">
                <p><strong>ID:</strong> {{ transaction._id }}</p>
                <p><strong>Criptomoneda:</strong> {{ transaction.crypto_code }}</p>
                <p><strong>Cantidad:</strong> {{ transaction.crypto_amount }}</p>
                <p><strong>Precio:</strong> $ {{ transaction.money }}</p>
                <p><strong>Acción:</strong> {{ translatedAction(transaction.action) }}</p>
                <p><strong>Fecha y Hora:</strong> {{ formatDatetime(transaction.datetime) }}</p>
            </div>
            <div class="button-container">
                <button @click="goBack" class="btn-back">Volver</button>
                <button @click="printTransaction" class="btn-print">Imprimir</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/CriptoService';


const route = useRoute();
const router = useRouter();
const transaction = ref(null);
const loading = ref(true);

const fetchTransaction = async () => {
    try {
        const response = await apiClient.get(`/transactions/${route.params.id}`);
        transaction.value = response.data;
    } catch (error) {
        console.error('Error al obtener la transacción:', error);
    } finally {
        loading.value = false;
    }
};

const formatDatetime = (datetime) => {
    const date = new Date(datetime);
    // Verificar si la fecha es válida
    if (!isNaN(date.getTime())) {
        return date.toLocaleString('es-ES', { 
            dateStyle: 'short', 
            timeStyle: 'short',
            hour12: false 
        });
    } else {
        return 'Fecha no válida';
    }
};

const translatedAction = (action) => {
    return action === 'purchase' ? 'Compra' : 'Venta';
};

const goBack = () => {
    router.push({ name: 'History' });
};

const printTransaction = () => {
    window.print();
};

onMounted(fetchTransaction);
</script>

<style scoped>
.container-detail {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
}

.transaction-details {
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
    color: #000000;
}

.text-2 {
    color: #410677;
}

.transaction-info {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 6px;
    margin: 1rem 0;
}

.transaction-info p {
    margin: 0.75rem 0;
    color: #2c3e50;
    font-size: 1.1rem;
}

.transaction-info strong {
    color: #410677;
    margin-right: 0.5rem;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
}

.btn-back, .btn-print {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-back {
    background-color: #909399;
    color: white;
}

.btn-print {
    background-color: #410677;
    color: white;
}

.btn-back:hover, .btn-print:hover {
    opacity: 0.8;
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    .container-detail {
        margin: 1rem;
        padding: 1rem;
    }

    .transaction-details {
        padding: 1rem;
    }

    .button-container {
        flex-direction: column;
    }

    .btn-back, .btn-print {
        width: 100%;
    }
}

@media print {
    .button-container {
        display: none;
    }
}
</style>

