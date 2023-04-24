<script>

// Utilities
import axios from 'axios';
import { router } from '../../router';

export default {
    name: 'HomeSearch',
    data() {
        return {
            router,
        }
    },
    methods: {
        handleSearch() {
            this.getMovies()
        },
        getMovies() {
            axios.get('http://localhost:8000/api/movies', {
                params: {
                    title: this.$route.params.title,
                }
            })
                .then((response) => {
                    console.log('Index Film Cercati', response.data);
                    this.movies = this.movies.concat(response.data.movies);
                })
                .catch((response) => {
                    console.log('Errore Index Film Cercati', response.data);
                })
        },
    }
}
</script>

<template>

    <div class="container">
        <label for="searchTitle">Titolo</label>
        <input type="text" id="searchTitle" name="searchTitle" placeholder="Inserisci il titolo...">
        <button @click="handleSearch()">Cerca</button>
    </div>

    <div class="container" v-if="movies">
        <div class="card" v-for="movie in movies">
            <h2>Titolo: {{ movie.title }}</H2>
        </div>

    </div>
</template>

<style lang="scss" scoped>
h2 {
    font-size: 1rem;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;

    font-size: 0.8rem;
}

.card {
    width: 200px;
    padding: 1rem;
    border: 2px solid lightblue;
}
</style>