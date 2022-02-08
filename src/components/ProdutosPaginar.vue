<template>
  <div>
    <ul v-if="paginasTotal > 1">
      <li v-for="pagina in paginasTotal" :key="pagina">
        <router-link :to="{ query: query(pagina) }">{{ pagina }}</router-link>
      </li>
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
