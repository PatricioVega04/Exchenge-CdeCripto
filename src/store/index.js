
import { createStore } from "vuex";

export default createStore({
  state: {
    userId: localStorage.getItem("userId") || null
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id;
      localStorage.setItem("userId", id); // Guardar en localStorage
    },
    logout(state) {
      state.userId = null;
      localStorage.removeItem("userId"); // Eliminar ID guardado
    }
  },
  getters:{
    getUserId:(state) =>state.userId
  }
});

