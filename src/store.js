import Vue from "vue";
import Vuex from "vuex";
import { api } from "./services.js";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    usuario_produtos: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload); //object assign combina objetos state.usuario e payload, pq senao deleta toda a outra parte presente em state.usuario
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshit(payload); //manda pro inicio da array, pra ficar como mais recentes
    }
  },
  actions: {
    getUsuarioProdutos(context) {
      api
        .get(`/produto?usuario_id=${context.state.usuario.id}`) //pra puxar o produto do usuario
        .then(response => {
          context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
        });
    },
    getUsuario(context, payload) {
      return api.get(`/usuario/${payload}`).then(response => {
        context.commit("UPDATE_USUARIO", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", { id: payload.email }); //pra criar um id
      return api.post("/usuario", payload);
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      context.commit("UPDATE_LOGIN", false);
    }
  }
});
