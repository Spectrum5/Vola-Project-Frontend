<script>

// Utilities
import { store } from '../../store';
import AppErrorForm from '../../components/AppErrorForm.vue';
import axios from 'axios';
// Configurazione di Axios per l'utilizzo dei cookie
axios.defaults.withCredentials = true;


export default {
    name: 'AppRegister',
    components: {
        AppErrorForm
    },
    data() {
        return {
            store,
            form: {
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                password_confirmation: null
            }
        }
    },
    methods: {
        // Gestione della registrazione
        handleRegister() {
            // Validazione dei dati inseriti dall'utente
            this.validateData();
            // Redirect alla pagina di ricerca
            this.$router.push('/search');
        },
        // Aggiunta di un errore al form
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
                // Altrimenti, controllo se l'errore è già stato inserito
                if (!this.store.errors.some(error => error.field == field)) {
                    // Altrimenti, controllo se l'errore è già stato inserito
                    this.store.errors.push({
                        message: message,
                        field: field
                    });
                }
            }
        },
        // Validazione del campo first_name
        firstNameValidation() {
            // Recupero il riferimento all'elemento HTML del campo first_name
            let firstNameInput = document.getElementById('first_name');
            // Rimuovo la classe 'invalid' dal campo first_name
            firstNameInput.classList.remove('invalid');

            // Controllo la lunghezza del campo first_name
            if (firstNameInput.value.trim().length == 0) {
                // Se la lunghezza è 0, aggiungo un errore al campo first_name
                this.addError('Il campo nome deve essere compilato', 'first_name');
                firstNameInput.classList.add('invalid');
            }
            else if (firstNameInput.value.trim().length < 3) {
                // Se la lunghezza è inferiore a 3, aggiungo un errore al campo first_name
                this.addError('Il campo nome deve essere almeno di 3 caratteri', 'first_name');
                firstNameInput.classList.add('invalid');
            }
            else if (firstNameInput.value.trim().length > 128) {
                // Se la lunghezza è superiore a 128, aggiungo un errore al campo first_name
                this.addError('Il campo nome non deve superare i 128 caratteri', 'first_name');
                firstNameInput.classList.add('invalid');
            }
        },
        // Validazione del campo first_name
        lastNameValidation() {
            // Recupero il riferimento all'elemento HTML del campo last_name
            let lastNameInput = document.getElementById('last_name');
            lastNameInput.classList.remove('invalid');

            // Last Name Length
            if (lastNameInput.value.trim().length == 0) {
                // Se la lunghezza è 0, aggiungo un errore al campo last_name
                this.addError('Il campo cognome deve essere compilato', 'last_name');
                lastNameInput.classList.add('invalid');
            }
            else if (lastNameInput.value.trim().length < 3) {
                // Se la lunghezza è inferiore a 3, aggiungo un errore al campo last_name
                this.addError('Il campo cognome deve essere almeno di 3 caratteri', 'last_name');
                lastNameInput.classList.add('invalid');
            }
            else if (lastNameInput.value.trim().length > 128) {
                // Se la lunghezza è superiore a 128, aggiungo un errore al campo last_name

                this.addError('Il campo cognome non deve superare i 128 caratteri', 'last_name');
                lastNameInput.classList.add('invalid');
            }
        },
        // Metodo per la validazione dell'email
        emailValidation() {
            // recupera l'input dell'email dal DOM
            let emailInput = document.getElementById('email');
            // rimuove la classe 'invalid' dall'elemento input
            emailInput.classList.remove('invalid');

            // Validazione dell'email
            if (emailInput.value.trim().length == 0) { // se l'email è vuota o contiene solo spazi
                this.addError('Il campo email deve essere compilato', 'email'); // aggiungi l'errore alla lista degli errori e mostra il messaggio all'utente
                emailInput.classList.add('invalid');
            } else if (emailInput.value.trim().length < 10) { // se l'email è troppo corta (meno di 10 caratteri)
                this.addError('L\'email deve essere lunga almeno 10 caratteri', 'email'); 
                emailInput.classList.add('invalid');
            } else if (emailInput.value.trim().length > 64) { // se l'email è troppo lunga (più di 64 caratteri)
                this.addError('L\'email non deve superare i 64 caratteri', 'email');
                emailInput.classList.add('invalid');
            } else if (!emailInput.value.toLowerCase().match( // se l'email non corrisponde al pattern di una email valida
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                this.addError('La tua email contiene caratteri non permessi', 'email'); 
                emailInput.classList.add('invalid'); // aggiungi la classe 'invalid' all'elemento input per evidenziare il campo
            }
        },

        passwordValidation() {
            let passwordInput = document.getElementById('password');
            passwordInput.classList.remove('invalid');

            //  // Valida la lunghezza della password
            if (passwordInput.value.length == 0) {
                this.addError('Il campo password deve essere compilato', 'password');
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length < 6) {
                // Se la password è troppo corta, aggiunge un errore alla lista degli errori
                this.addError('La password deve essere lunga almeno 6 caratteri', 'password');
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length > 32) {
                // Se la password è troppo lunga, aggiunge un errore alla lista degli errori
                this.addError('La password non deve superare i 32 caratteri', 'password');
                passwordInput.classList.add('invalid');
            }
        },
        
        passwordConfirmationValidation() {
            let passwordConfirmationInput = document.getElementById('password_confirmation');
            let passwordInput = document.getElementById('password');
            passwordConfirmationInput.classList.remove('invalid');

            // Password Confirmation
            if (passwordConfirmationInput.value.length == 0) {
                this.addError('Il campo conferma password deve essere compilato', 'password_confirmation');
                passwordConfirmationInput.classList.add('invalid');
            }
            if (passwordInput.value != passwordConfirmationInput.value) {
                this.addError('Le password inserite non coincidono', 'password_confirmation');
                passwordConfirmationInput.classList.add('invalid');
            }
        },

        validateData() {
            // Front End Validation
            console.log('Validazione dati registrazione...');
            this.store.errors = [];

            // Esegue la validazione per ogni campo
            this.firstNameValidation();
            this.lastNameValidation();
            this.emailValidation();
            this.passwordValidation();
            this.passwordConfirmationValidation();

            // Controlla se la validazione è andata a buon fine, in caso contrario visualizza un messaggio di errore
            if (this.store.errors.length == 0) this.postRegisterData();
            else console.log('Hai inserito dati non corretti. Riprova.');
        },

        postRegisterData() {
            // Crea un'istanza di FormData e inserisce le coppie chiave: valore corrispondenti alle coppie dell'oggetto form
            const formData = new FormData();
            for (const item in this.form) {
                formData.append(`${item}`, this.form[item]);
            }
            console.log('Form Data compilato', formData);

            // Invia la richiesta POST al server con i dati inseriti dall'utente
            axios.post('http://localhost:8000/register', formData)
                .then((response) => {
                    console.log('Risposta Register', response);

                    // Emette ad App.vue l'evento per richiedere l'utente autenticato
                    this.$emit('getUserEvent');
                })
                // Se la richiesta fallisce, visualizza un messaggio di errore
                .catch((response) => {
                    this.addError('Errore del server. Riprovare piú tardi', 'server_error');
                    console.log('Errore Invio dati Register:', response.response);
                })
        }
    },
    // Imposta il titolo della pagina
    mounted() {
        document.title = 'Vola | Register';
        // Inizializza la lista di errori
        this.store.errors = [];
    }
}
</script>

<template>
    <div class="container">
        <div class="formContainer">
            <h1 class="mainTitle">register</h1>
             <!-- Form di registrazione -->
            <form @submit.prevent="handleRegister()">
                <!-- First Name & Last Name -->
                <div class="row inline-center">
                    <div class="group small">
                        <label for="first_name">nome *</label>
                        <input type="text" id="first_name" name="first_name" placeholder="Il tuo nome"
                            v-model="form.first_name" v-on:blur="firstNameValidation()">
                    </div>

                    <div class="group small">
                        <label for="last_name">cognome *</label>
                        <input type="text" id="last_name" name="last_name" placeholder="Il tuo cognome"
                            v-model="form.last_name" v-on:blur="lastNameValidation()">
                    </div>
                </div>

                <!-- Email -->
                <div class="row">
                    <div class="group large">
                        <label for="email">email *</label>
                        <input type="text" id="email" name="email" placeholder="test@example.com" v-model="form.email"
                            v-on:blur="emailValidation()">
                    </div>
                </div>

                <!-- Password & Password Confirmation -->
                <div class="row inline-center">
                    <div class="group small">
                        <label for="password">password *</label>
                        <input type="password" id="password" name="password" placeholder="La tua password"
                            v-model="form.password" v-on:blur="passwordValidation()">
                    </div>

                    <div class="group small">
                        <label for="password_confirmation">conferma password *</label>
                        <!-- Input per la conferma della password -->
                        <input type="password" id="password_confirmation" name="password_confirmation"
                            placeholder="Conferma la tua password" v-model="form.password_confirmation"
                            v-on:blur="passwordConfirmationValidation()">
                    </div>
                </div>

                <div class="row">
                    <button class="btn">registrati</button>
                </div>
                <!-- Error form component -->
                <AppErrorForm v-if="store.errors.length > 0" />
            </form>
            <!-- Link per il login -->
            <router-link to="/login" class="customLink">Hai gia' un account? Accedi.</router-link>
            
            <p class="campi-required">I campi contrassegnati con * sono obbligatori</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/form.scss' as *;

.row.inline-center {
    .group {
        flex-grow: 1;
    }
}

.btn {
    text-transform: capitalize;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    padding: 0.5rem;

    &:hover {
        background-color: rgb(123, 169, 215);
        color: white;
    }
}
</style>