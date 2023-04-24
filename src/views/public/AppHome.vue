<script>

// Utilities
import axios from 'axios';
import { router } from '../../router';
import { store } from '../../store';

export default {
    name: 'AppHome',
    components: {

    },
    data() {
        return {
            router,
            store
        }
    },
    methods: {
        login() {
            axios.post('/api/login', /* dati di login */)
                .then(response => {
                    // gestisci il login con successo
                    this.$router.push('/login');
                    location.reload(); // forza il ricaricamento della pagina
                })
                .catch(error => {
                    // gestisci l'errore di login
                    this.store.errors.push(error);
                    location.reload(); // forza il ricaricamento della pagina
                });
        },
        register() {
            axios.post('/api/register', /* dati di registrazione */)
                .then(response => {
                    // gestisci la registrazione con successo
                    this.$router.push('/register');
                })
                .catch(error => {
                    // gestisci l'errore di registrazione
                    this.store.errors.push(error);
                });
        }
    },
    mounted() {
        document.title = 'Vola | Welcome';
        this.store.errors = [];
    }
}
</script>

<template>
    <button class="btn" @click="$router.push('/login')">
        Login
    </button>
    <button class="btn" @click="$router.push('/register')">
        Register
    </button>
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/variables.scss';
</style>
