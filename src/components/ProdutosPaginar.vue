<template>
  <div>
    <ul v-if="paginasTotal > 1">
      <router-link :to="{ query: query(1) }"><</router-link>
      <li v-for="pagina in paginas" :key="pagina">
        <router-link :to="{ query: query(pagina) }">{{ pagina }}</router-link>
      </li>
      <router-link :to="{ query: query(paginasTotal) }">></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1
    },
    produtosTotal: {
      type: Number,
      default: 1
    }
  },
  methods: {
    query(pagina) {
      //pra quando mudar de página, não perde a info do que foi buscado
      return {
        ...this.$route.query,
        _page: pagina
      };
    }
  },
  computed: {
    paginas() {
      const currentPage = Number(this.$route.query._page); //página atual que a pessoa está
      const range = 9; //numero de paginas que quer que apareça
      const offset = Math.ceil(range / 2);
      const total = this.paginasTotal;
      const pagesArray = [];
      for (let i = 1; i <= total; i++) {
        pagesArray.push(i); //manda cada um dos itens de i
      }
      pagesArray.splice(0, currentPage - offset); //2 argumentos: da onde começa a remover e até onde remove
      pagesArray.splice(range, total); //do nono item até o total
      return pagesArray;
    },
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0; //se total for diferente de infinito, arredonda pra cima o número de páginas
    }
  }
};
</script>

<style>
ul {
  grid-column: 1 /-1;
}

li {
  display: inline-block;
}
li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}
li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>
