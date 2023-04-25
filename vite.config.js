import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],

    // Qui facciamo un'importazione globale (quindi per tutti i componenti) di alcuni file .scss
    css: {
        preprocessorOptions: {
            scss: {
                // Attenzione al percorso!
                additionalData:
                    `@use './src/styles/main.scss';`
            }
        }
    }
})
