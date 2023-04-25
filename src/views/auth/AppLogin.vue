<script>
// Utilities
import { store } from '../../store';
import { router } from '../../router';
import AppErrorForm from '../../components/AppErrorForm.vue';

import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppLogin',
    components: {
        AppErrorForm
    },
    data() {
        return {
            store,
            form: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        // Metodo per gestire il login
        handleLogin() {
            this.validateData();

        },
        // Aggiunge un errore alla lista di errori
        addError(message, field) {
            // Controlla se in store.errors sono presenti errori con lo stesso campo di quello passato
            // e se non ci sono aggiunge l'errore passato come argomento, altrimenti no
            if (this.store.errors.length == 0) {
                this.store.errors.push({
                    message: message,
                    field: field
                });
            }
            else {
                if (!this.store.errors.some(error => error.field == field)) {
                    this.store.errors.push({
                        message: message,
                        field: field
                    });
                }
            }
        },
        // Valida l'email inserita dall'utente
        emailValidation() {
            // Ottiene l'input dell'email
            let emailInput = document.getElementById('email');
            emailInput.classList.remove('invalid');

            // Email Validation
            if (emailInput.value.trim().length == 0) {
                this.addError('Il campo email deve essere compilato', 'email');
                emailInput.classList.add('invalid');
            }
            else if (emailInput.value.trim().length < 10) {
                this.addError('L\'email deve essere lunga almeno 10 caratteri', 'email');
                emailInput.classList.add('invalid');
            }
            else if (emailInput.value.trim().length > 64) {
                this.addError('L\'email non deve superare i 64 caratteri', 'email');
                emailInput.classList.add('invalid');
            }
            else if (!emailInput.value.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                this.addError('La tua email contiene caratteri non permessi', 'email');
                emailInput.classList.add('invalid');
            }
        },
        // Valida la password inserita dall'utente
        passwordValidation() {
            // Ottiene l'input della password
            let passwordInput = document.getElementById('password');
            passwordInput.classList.remove('invalid');

            // Password Lenght
            if (passwordInput.value.length == 0) {
                this.addError('Il campo password deve essere compilato', 'password');
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length < 10) {
                this.addError('La password deve essere lunga almeno 10 caratteri', 'password');
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length > 64) {
                this.addError('La password non deve superare i 64 caratteri', 'password');
                passwordInput.classList.add('invalid');
            }
        },
        validateData() {
            // Front End Validation
            console.log('Validazione dati login...');
            // Resetta la lista di errori
            this.store.errors = [];

            // Esegue la validazione dell'email e della password
            this.emailValidation();
            this.passwordValidation();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0)
                // Se la validazione è andata a buon fine, richiedi il cookie CSRF
                this.getCookie();
            else {
                // Se ci sono errori, mostra un messaggio in console
                console.log('Hai inserito dati non corretti. Riprova.');
            }
        },
        // Richiesta Cookie CSRF prima di effettuare il login
        getCookie() {
            // Esegue una richiesta GET all'endpoint "sanctum/csrf-cookie" del server
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((response) => {
                    console.log('Cookie CSRF ottenuto', response);
                    // Quando la richiesta ha successo, richiama la funzione postLoginData()
                    this.postLoginData()
                })
                .catch((response) => {
                    console.log('Errore ottenimento Cookie CSRF', response);
                    // Se la richiesta fallisce, memorizza gli errori nella variabile "errors" dello store
                    this.store.errors = response.data;
                })
        },
        // Questa funzione esegue la richiesta di login al server
        postLoginData() {
            // Esegue una richiesta POST all'endpoint "login" del server con le credenziali inserite dall'utente
            axios.post('http://localhost:8000/login', {
                email: this.form.email,
                password: this.form.password
            })
                .then((response) => {
                    console.log('Risposta Login', response);

                    // Quando la richiesta ha successo, emette un evento per richiedere l'utente autenticato
                    this.$emit('getUserEvent');
                }
                )
                .catch((response) => {
                    console.log('Errore Login', response);
                    // Se la richiesta fallisce, memorizza gli errori nella variabile "errors" dello store
                    this.store.errors = response;
                })
        }
    },
    mounted() {
        // Imposta il titolo della pagina
        document.title = 'Vola | Login';
        // Inizializza la variabile "errors" dello store
        this.store.errors = [];
    }
}
</script>

<template>
    <div class="container">
        <div class="formContainer">
            <h1 class="mainTitle">login</h1>
            <form @submit.prevent="handleLogin()">
                <div class="row">
                    <div class="group large">
                        <label for="email">email *</label>
                        <input type="text" id="email" name="email" placeholder="test@example.com" v-model="form.email"
                            v-on:blur="emailValidation()">
                    </div>
                </div>

                <div class="row">
                    <div class="group large">
                        <label for="password">password *</label>
                        <input type="password" id="password" name="password" placeholder="Your password"
                            v-model="form.password" v-on:blur="passwordValidation()">
                    </div>
                </div>

                <div class="row">
                    <button class="btn">login</button>
                </div>
                <!-- Form per la visualizzazione degli errori -->
                <AppErrorForm v-if="store.errors.length > 0" />
            </form>
            <!-- Link per la registrazione -->
            <router-link to="/register" class="customLink">Non hai un account? Creane uno.</router-link>
            
            <p class="campi-required">I campi contrassegnati con * sono obbligatori</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/form.scss' as *;

.btn {
    text-transform: capitalize;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    padding: 0.5rem;
    background-color: white;

    &:hover {
        background-color: rgb(123, 169, 215);
        color: white;
    }
}
</style>