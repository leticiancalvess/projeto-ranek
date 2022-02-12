<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">
            Deletar
          </button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutoAdicionar from "./ProdutoAdicionar";
import ProdutoItem from "./ProdutoItem";
import { mapState, mapActions } from "vuex";
import { api } from "./services.js";
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
    ...mapActions(["getUsuarioProdutos"]),
    deletarProduto(id) {
      const confirmar = window.confirm("Deseja remover este produto?");
      if (confirmar) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            this.getUsuarioProdutos(); //puxa novamente os produtos depois de deletar, pra remover o produto deletado da página
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    }
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

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../components/assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
