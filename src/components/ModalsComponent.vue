<template>
    <!-- Modal de Carga -->
    <div v-if="loading" class="modal-overlay">
        <div class="modal loading-modal">
            <div class="loader"></div>
            <p>Procesando tu transacción...</p>
        </div>
    </div>

    <!-- Modal de Éxito -->
    <div v-if="showSuccess" class="modal-overlay">
        <div class="modal success-modal">
            <i class="fas fa-check-circle"></i>
            <h3>¡Transacción Exitosa!</h3>
            <p>Tu compra se ha realizado correctamente.</p>
            <button @click="closeSuccess" class="modal-button">Aceptar</button>
        </div>
    </div>

    <!-- Modal de Error -->
    <div v-if="showError" class="modal-overlay">
        <div class="modal error-modal">
            <i class="fas fa-times-circle"></i>
            <h3>Error</h3>
            <p>Ha ocurrido un error al procesar tu transacción.</p>
            <button @click="closeError" class="modal-button">Cerrar</button>
        </div>
    </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import { defineProps, defineEmits } from 'vue';

defineProps({
    loading: Boolean,
    showSuccess: Boolean,
    showError: Boolean
});

const emit = defineEmits(['update:showSuccess', 'update:showError']);

const closeSuccess = () => {
    emit('update:showSuccess', false);
};

const closeError = () => {
    emit('update:showError', false);
};
</script>

<style scoped>
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

.modal {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    min-width: 300px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.loading-modal {
    background-color: white;
}

.success-modal {
    border-top: 5px solid #4CAF50;
}

.error-modal {
    border-top: 5px solid #f44336;
}

.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.modal i {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.success-modal i {
    color: #4CAF50;
}

.error-modal i {
    color: #f44336;
}

.modal h3 {
    margin: 0.5rem 0;
    color: #333;
}

.modal p {
    color: #666;
    margin-bottom: 1.5rem;
}

.modal-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem 2rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.error-modal .modal-button {
    background-color: #f44336;
}

.modal-button:hover {
    opacity: 0.9;
}
</style>