<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto" />
        <p>{{ produto.descricao }}</p>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutoAdicionar from "./ProdutoAdicionar";
import ProdutoItem from "./ProdutoItem";
import { mapState, mapActions } from "vuex";
export default {
  name: "UsuarioProdutos",
  components: {
    ProdutoAdicionar,
    ProdutoItem
  },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"]) //puxando o estado de login(pra ver se está logado), usuario e usuario_produtos
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"])
  },
  watch: {
    login() {
      this.getUsuarioProdutos(); //quando login mudar de falso pra verdadeiro
    }
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos();
    } //se o login for verdadeiro, o usuario ja foi pego e assim pode pegar os produtos
  }
};
</script>
<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
