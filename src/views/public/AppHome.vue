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
    background-image: url('../../../bg-film.jpg');
    height: 100vh;
    background-size: cover;

    h1 {
        font-size: 4rem;
        margin-bottom: 10px;
    }
    .btn {
        margin-top: 1rem;
        height: 5rem;
        width: 15rem;
        background: linear-gradient(135deg,
                rgb(6, 7, 30) 0%,
                rgb(240, 207, 163) 100%);
        color: #fff;
        border: none;
        font-weight: bold;
        transition: transform 250ms;
        font-size: 2rem;

        &:hover {
            transform: translateY(-10px);
            box-shadow: 0px 10px 20px rgba(255, 0, 0, 0.4);
            color: black;
        }
    }


}
</style>
