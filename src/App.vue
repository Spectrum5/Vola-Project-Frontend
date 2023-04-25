<script>

// Utilities
import { store } from './store';
import { router } from './router';
import axios from 'axios';
// Impostiamo Axios in modo che invii i cookie con le richieste
axios.defaults.withCredentials = true;

export default {
    name: 'App',
    components: {
    },
    data() {
        return {
            store,
            router
        }
    },
    methods: {
        // Metodo per richiedere lo user all'API e salvare il risultato nello store
        getUser() {
            axios.get('http://localhost:8000/api/user')
                .then((response) => {
                    console.log('User', response.data)
                    this.store.user = response.data;
                     // Se lo user viene ottenuto con successo, reindirizziamo l'utente alla pagina di ricerca
                    router.push('/search');
                })
                .catch((response) => {
                    console.log('Ottenimento user fallito');
                })
        }
    },
    computed: {
        // Calcoliamo il nome dell'evento da ascoltare sulla Router View in base alla pagina corrente
        calcEvent() {
            if (this.$route.name == 'login' || this.$route.name == 'register') return 'getUserEvent';
            else return null;
        }
    },
    mounted() {
        // Richiediamo lo User alla creazione della pagina per ripristinare la sessione precedente, se ancora valida
        this.getUser();
    }
}
</script>

<template>
    <!-- Ascoltiamo l'evento calcolato in base alla pagina corrente e chiamiamo il metodo getUser() -->
    <router-view @[calcEvent]="getUser()"></router-view>
</template>

<style lang="scss">
@import './styles/main';
</style>