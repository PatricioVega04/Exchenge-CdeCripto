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
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  </style>
<!-- <template>
    <div class="row">
        <div class="col-md-5 offset-md-3">
            <div>
                 <h1>C DE CRIPTO Official Site </h1> <br>
                 <h3>Excellent user experience, Low Fees.</h3>
            </div>
        <div>
        <form>
           <div class="form-group">
               <label for="">ID Usuario</label> <br>
               <input type="text" class="form-control" /> 
               <button type="submit" class="btn btn-primary">Login</button>          
           </div>
        </form>
         <h4>Join the community now.</h4>
        </div>
        </div>  
    </div>
    
     
        
   </template>
<script>
import { mapState } from 'vuex';
export default {
    computed:{
      ...mapState('auth', {
        name: (state) => state.name, 
      }),
    }
};
</script> -->


