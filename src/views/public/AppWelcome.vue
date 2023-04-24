<script>

// Utilities
import axios from 'axios';
import { router } from '../../router';

export default {
    name: 'AppWelcome',
    components: {

    },
    data() {
        return {
        }
    },
    methods: {
        
    },
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
