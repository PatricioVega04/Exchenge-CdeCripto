<template>
    <div class="container">
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
<style scoped>

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a, #2a0435);
  color: white;
  font-family: "Poppins", sans-serif;
}

.login-box {
  background: rgba(65, 6, 119, 0.8);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(65, 6, 119, 0.5);
  width: 350px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.logo {
  text-align: center;
  margin-bottom: 15px;
}

.img-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
}

.text-1 {
  color: #ffffff;
  font-weight: bold;
}

.text-2 {
  color: #c2a2ff;
  font-weight: bold;
  font-size: 1.5em;
}

.subtitle {
  font-size: 14px;
  color: #c2a2ff;
  margin-bottom: 15px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-username {
  padding: 10px;
  border: none;
  border-radius: 6px;
  width: 80%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  font-size: 14px;
  transition: 0.3s;
  margin: 0 auto;
  display: block;
}

.input-username:focus {
  border: 2px solid #c2a2ff;
  background: rgba(255, 255, 255, 0.2);
}

.btn-access {
  padding: 10px;
  background: #c2a2ff;
  color: #410677;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  width: 80%;
  margin: 0 auto;
  display: block;
}

.btn-access:hover {
  background: #e0c3ff;
  transform: scale(1.05);
}

.error-message {
  color: #ff4d4d;
  font-size: 12px;
  font-weight: bold;
}

.join-text {
  font-size: 12px;
  color: #ddd;
  margin-top: 10px;
}
</style>