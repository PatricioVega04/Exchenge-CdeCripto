<template>
    <div>
        <div class="logo">
            <img src="../assets/logo.jpg" class="img-logo" alt="Logo">
            <h1><strong class="text-1">C DE </strong><strong class="text-2">C</strong><strong class="text-1">RIPTO</strong></h1>
             <h3>-Official Website-</h3>
        </div>
        <div class="title">
            <h3> Excellent user experience, Low Fees</h3>
            <div class="login">
                   <form class="login-form" @submit.prevent="access">
                      <p v-if="error" class="error-message">*Debe ingresar un nombre de usuario</p>
                      <p v-if="lengthError" class="error-message">*El nombre de usuario debe tener al menos 6 caracteres y una mayúscula</p>
                      <input v-model="userName" id="username" class="input-username" placeholder="Nombre de usuario" type="text" />
                      <button type="submit" class="btn-access">Acceder</button>
                    </form>
            </div>
            <h5>Join the community now.</h5>
        </div>
    </div>
  
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/useUserStore';

const userStore = useUserStore();
const userName = ref('');
const router = useRouter();

const error = ref(false);
const lengthError = ref(false);
const uppercaseError = ref(false);

const access = () => {
    error.value = false;
    lengthError.value = false;
    uppercaseError.value = false;

    if (!userName.value) {
        error.value = true;
        return;
    }

    if (userName.value.length < 6) {
        lengthError.value = true;
        return;
    }

    if (!/[A-Z]/.test(userName.value)) {
        lengthError.value = true;
        return;
    }

    userStore.setUserName(userName.value); 
    router.push({ name: 'EntryView' });
};
</script>