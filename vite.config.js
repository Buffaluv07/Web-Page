
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: { 
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                countdown: resolve(__dirname, 'countdown/index.html'),
                lineup: resolve(__dirname, 'lineup/index.html'),
                location: resolve(__dirname, 'location/index.html'),

            }
        }
    }
});