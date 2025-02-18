<template>
    <!-- Modal de Carga -->
    <div v-if="loading" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-message">
                <div class="spinner"></div>
                <p class="modal-text">Procesando transacción...</p>
            </div>
        </div>
    </div>

    <!-- Modal de Éxito -->
    <div v-if="showSuccess" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-message">
                <div class="success-icon">✓</div>
                <p class="modal-text">¡Transacción exitosa!</p>
                <button @click="closeSuccess" class="modal-button">Cerrar</button>
            </div>
        </div>
    </div>

    <!-- Modal de Error -->
    <div v-if="showError" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-message">
                <div class="error-icon">✕</div>
                <p class="modal-text">Error en la transacción</p>
                <button @click="closeError" class="modal-button">Cerrar</button>
            </div>
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

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    min-width: 300px;
}

.modal-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.modal-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 1rem 0;
}

.success-icon, .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.success-icon {
    color: #4CAF50;
}

.error-icon {
    color: #f56c6c;
}

.modal-button {
    padding: 0.75rem 2rem;
    font-size: 1.2rem;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.modal-button:hover {
    background-color: #410677;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000000;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>