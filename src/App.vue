<script>
import { store } from './store';

// Passi per utilizzare sottocomponenti
// 1. Importazione

export default {
    name: "App",
    data() {
        return {
            store
        }
    },
    // 2. Registrazione
    components: {
        
    },
    methods: {
        
    }
};
</script>

<template>
    
</template>

<style lang="scss">
// Qui possiamo anche importare dei file .scss (attenzione al percorso)
@import './styles/main';

</style>
