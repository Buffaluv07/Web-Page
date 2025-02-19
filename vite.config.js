
import { defineConfig } from 'vite'
import resolve from 'path'


export default defineConfig({ 
    build: {
        run: true,
        preview: true,  
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                nested1: resolve(__dirname, 'Timer/index.html'),
                nested2: resolve(__dirname, 'Lineup/index.html'),
                nested3: resolve(__dirname, 'Location/index.html')
                nested4: resolve(__dirname, 'Tickets/index.html'),
            }
        }               
    }
})