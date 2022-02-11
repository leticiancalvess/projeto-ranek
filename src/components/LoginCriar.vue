<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">
        Criar Conta
      </button>
      <UsuarioForm v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">
          Criar Usuário
        </button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "../components/UsuarioForm.vue";

export default {
  name: "LoginCriar",
  components: {
    UsuarioForm
  },
  data() {
    return {
      criar: false
    };
  },
  methods: {
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch(
          "getUsuario",
          this.$store.state.usuario.email
        ); //get para poder salvar o login. async e await para que o getusuario so aconteça depois que a promessa de criar tenha acontecido. assim, nao tem chance do getusuario acontecer antes do criarusuario. PS: tem que mudar para return api em store.js
        this.$router.push({ name: "usuario" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
