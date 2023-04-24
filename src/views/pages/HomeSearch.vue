<script>

// Utilities
import axios from 'axios';
import { router } from '../../router';

export default {
    name: 'HomeSearch',
    data() {
        return {
            router,
            title: '',
            movies: [],
            page: 1,
            oldTitle: '',
            id: '',
            movie: null
        }
    },
    methods: {
        handleSearch() {
            this.getMovies()
        },
        getMovies() {
            if (this.title != '' && this.page > 0) {
                axios.get('http://localhost:8000/api/movies', {
                    params: {
                        title: this.title,
                        page: this.page
                    }
                })
                    .then((response) => {
                        console.log('Index Film Cercati', response.data.Search);

                        // if (this.oldTitle == this.title || this.page == 1) {
                        //     // niente
                        // }
                        // else if (this.oldTitle != this.title && this.page > 1) {
                        //     // Niente
                        // }

                        // else if (this.oldTitle == this.title && this.page > 1) {
                        this.movies = this.movies.concat(response.data.Search);
                        // }

                        // else if (this.oldTitle != this.title && this.page == 1) {
                        //     this.movies = response.data.Search;
                        // }
                        // this.oldTitle = this.title
                    })
                    .catch((response) => {
                        console.log('Errore Index Film Cercati', response);
                    })
            }
        },
        getMovie() {
            axios.get('http://localhost:8000/api/movies', {
                params: {
                    id: this.id,
                }
            })
                .then((response) => {
                    console.log('Index ID Cercati', response.data);

                    this.movie = response.data;

                })
                .catch((response) => {
                    console.log('Errore Index ID Cercati', response);
                })
        },
        loadMore() {
            this.page++
            this.getMovies()
        }
    }
}
</script>

<template>
    <div class="container" v-if="id.length <= 0">
        <label for="searchTitle">Titolo</label>
        <input type="text" id="searchTitle" name="searchTitle" placeholder="Inserisci il titolo..." v-model="title">
        <button @click="handleSearch()">Cerca</button>
    </div>
    <div class="container"  v-if="title.length <= 0">
        <label for="searchId">ID</label>
        <input type="text" id="searchId" name="searchId" placeholder="Inserisci ID..." v-model="id">
        <button @click="getMovie()">Cerca</button>
    </div>
    <div class="container" v-if="movies">
        <div class="card" v-for="movie in movies">
            <h2>Titolo: {{ movie.Title }}</H2>
        </div>
    </div>
    <div class="container" v-if="movie">
        <div class="card">
            <h2>Titolo: {{ movie.Title }}</H2>
        </div>
    </div>
    <button class="btn" @click="loadMore()" v-if="this.movies.length > 0">
        Richiedi altri
    </button>
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