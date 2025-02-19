<template>
    <div class="login-container">
      <h2>Login</h2>
      <input v-model="userId" placeholder="Ingresa tu ID" />
      <button @click="handleLogin">Entrar</button>
    </div>
  </template>
  
  <script>
  import { mapMutations } from "vuex";
  
  export default {
    data() {
      return {
        userId: ""
      };
    },
    methods: {
    ...mapMutations(["setUserId"]),
    handleLogin() {
      const regex = /^[a-zA-Z0-9]{4,}$/;
      
      if (regex.test(this.userId)) {
        this.setUserId(this.userId);
        this.$router.push("/home"); 
      } else {
        alert("El ID debe ser alfanumérico y tener al menos 4 caracteres.");
      }
    }
  }
  };
  </script>
  
  