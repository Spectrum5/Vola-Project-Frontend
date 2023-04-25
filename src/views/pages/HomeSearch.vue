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
            this.movies = []; // svuota l'array movies
            this.getMovies();
        },
        getMovies() {
            if (this.title != '' && this.page > 0) {
                return axios.get('http://localhost:8000/api/movies', {
                    params: {
                        title: this.title,
                        page: this.page
                    }
                })
                    .then((response) => {
                        console.log('Index Film Cercati', response.data.Search);

                        // Aggiunge i nuovi risultati alla variabile movies
                        this.movies = this.movies.concat(response.data.Search);
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
            this.page++;
            this.getMovies().then(() => {
                // Aggiungi i nuovi film a quelli già presenti
                // No need to clean the movies array, we're just appending to it
            });
        },
        handleLogout() {
            axios.post('http://localhost:8000/logout')
                .then(response => {
                    // Reset user in store
                    if (this.$store && this.$store.state.user) {
                        this.$store.state.user = null;
                    }
                    // Redirect to login page
                    this.$router.push('/login');
                    console.log('Logged Out');
                })
                .catch(error => {
                    console.log('Error logging out:', error);
                });
        }
    }
}
</script>

<template>
    <div class="bg-search">
        <div class="container">
            <div v-if="id.length <= 0">
                <label for="searchTitle" class="text-white"></label>
                <input type="text" id="searchTitle" name="searchTitle" placeholder="Inserisci il titolo..." v-model="title">
                <button @click="handleSearch()">Cerca</button>
            </div>
            <div v-if="title.length <= 0">
                <label for="searchId"></label>
                <input type="text" id="searchId" name="searchId" placeholder="Inserisci ID..." v-model="id">
                <button @click="getMovie()">Cerca</button>
            </div>
            <button @click="handleLogout()">logout</button>
            <div class="container" v-if="movies">
                <div class="card" v-for="movie in movies" :key="movie.imdbID">
                    <img :src="movie.Poster" alt="Poster del film" class="card-img-top">
                    <div class="card-body">
                        <h2 class="card-title">{{ movie.Title }}</h2>
                        <p class="card-text card-year">{{ movie.Year }}</p>
                        <div v-if="movie === selectedMovie">
                            <p class="card-text card-plot">{{ movie.Plot }}</p>
                        </div>
                        <div v-else>
                            <p class="card-text"><a href="#" @click="selectMovie(movie)">Leggi di più</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container" v-if="movie">
                <div class="card">
                    <img :src="movie.Poster" alt="Poster del film" class="card-img-top">
                    <div class="card-body">
                        <h2 class="card-title">{{ movie.Title }}</h2>
                        <p class="card-text card-year">{{ movie.Year }}</p>
                        <p class="card-text card-plot">{{ movie.Plot }}</p>
                    </div>
                </div>
            </div>
            <button class="btn" @click="loadMore()" v-if="this.movies.length > 0">
                Richiedi altri
            </button>
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
    padding-top: 50px;
}

.card {
    width: 250px;
    height: 450px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .card-img-top {
        width: 100%;
        height: 70%;
        object-fit: cover;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;

        h2 {
            font-size: 1rem;
            margin-bottom: 10px;
        }

        p {
            font-size: 0.8rem;
            margin: 0;
            line-height: 1.2;
        }

        .card-text:first-of-type {
            margin-bottom: 5px;
            color: #666;
        }

        .card-text:last-of-type {
            margin-top: 10px;
        }

        .card-year {
            margin-bottom: 5px;
            color: #666;
        }

        .card-plot {
            margin-top: 10px;
        }
    }
}

input[type="text"] {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
}

button:hover {
    background-color: #555;
}

.bg-search {
    background-image: url('../../../../bg-film.jpg');
    background-size: cover;
    height: 100vh;
    background-attachment: fixed;
    overflow-y: scroll;
}
</style>