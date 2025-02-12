<template>
    <header class="header">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="Logo" class="imgLogo">
            <h1><strong class="text-1">C DE </strong><strong class="text-2">C</strong><strong class="text-1">RIPTO</strong></h1>
        </div>
        <nav class="nav">
            <ul>
                <li><router-link to="/initial" active-class="active">Tus Criptomonedas</router-link></li>
                <li><router-link to="/buy-crypto" active-class="active">Comprar</router-link></li>
                <li><router-link to="/sell-crypto" active-class="active">Vender</router-link></li>
                <li><router-link to="/history" active-class="active">Historial</router-link></li>
            </ul>
        </nav>
        <div class="dropdown" @click="toggleDropdown">
            <button>{{ userName }}</button>
            <div v-if="showDropdown" class="dropdown-content">
                <a v-if="userName" @click="logout">Cerrar Sesión</a>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/useUserStore';

const userStore = useUserStore();
const userName = computed(() => userStore.userName);
const router = useRouter();

const showDropdown = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const logout = () => {
    userStore.setUserName('');
    localStorage.removeItem('userName');
    router.push({ name: 'HomeView' });
    showDropdown.value = false;
};
</script>
<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #000000;
    padding: 15px 30px;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo {
    display: flex;
    align-items: center;
}

.imgLogo {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
}

h1 {
    font-size: 24px;
    font-weight: bold;
}

.text-1 {
    color: #ffffff;
}

.text-2 {
    color: #410677;
}

/* Estilos para la navegación */
.nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav li {
    margin: 0 15px;
}

.nav a {
    text-decoration: none;
    color: white;
    font-size: 16px;
    padding: 10px;
    transition: color 0.3s;
}

.nav a:hover,
.nav a.active {
    color: #410677;
}

/* Estilos para el menú de usuario */
.dropdown {
    position: relative;
    cursor: pointer;
}

button {
    background: transparent;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background 0.3s;
}

button:hover {
    background: rgba(255, 255, 255, 0.1);
}

.dropdown-content {
    position: absolute;
    right: 0;
    top: 40px;
    background: #2c2c3a;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    padding: 10px 0;
    min-width: 150px;
}

.dropdown-content a {
    display: block;
    padding: 10px 15px;
    color: white;
    text-decoration: none;
    transition: background 0.3s;
}

.dropdown-content a:hover {
    background: #410677;
}

</style>
