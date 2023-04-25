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
    <div class="bg-container d-flex justify-content-center align-items-center flex-column text-white">
        <div class="info">
            <h1>
                Film, serie TV e tanto altro. Senza limiti.
            </h1>
        </div>
        <div class="button-home">
            <button class="btn rounded-pill m-3" @click="$router.push('/login')">
                Login
            </button>
            <button class="btn rounded-pill m-3" @click="$router.push('/register')">
                Register
            </button>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.bg-container {
    background-image: url('../../../public/bg-film.jpg');
    height: 100vh;
    background-size: cover;

    .btn {
        margin-top: 1rem;
        height: 3rem;
        width: 10rem;
        background: linear-gradient(135deg,
                rgb(6, 7, 30) 0%,
                rgb(240, 207, 163) 100%);
        color: #fff;
        border: none;
        font-weight: bold;
        transition: transform 250ms;

        &:hover {
            transform: translateY(-10px);
            box-shadow: 0px 10px 20px rgba(255, 0, 0, 0.4);
            color: black;
        }
    }


}
</style>
