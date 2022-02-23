<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div
        class="produtos-wrapper"
        v-for="(compra, index) in compras"
        :key="index"
      >
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor"><span>Vendedor</span> {{ compra.vendedor_id }}</p>
        </ProdutoItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProdutoItem from "./ProdutoItem";
import { api } from "./services.js";
import { mapState } from "vuex";
export default {
  components: {
    ProdutoItem
  },
  data() {
    return {
      compras: null
    };
  },
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getCompras() {
      api.get(`/transacao?tipo=comprador_id`).then(response => {
        this.compras = response.data;
      }); //pega todas as compras feitas pelo usuário
    }
  },
  watch: {
    login() {
      this.getCompras(); //qnd o login mudar, puxa as compras
    }
  },
  created() {
    if (this.login) {
      this.getCompras();
    }
  }
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
