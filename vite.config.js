
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: "/Web-Page/",
    build: { 
        outDir: "docs",
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                countdown: resolve(__dirname, 'countdown/index.html'),
                lineup: resolve(__dirname, 'lineup/index.html'),
                location: resolve(__dirname, 'location/index.html'),
                projects : resolve(__dirname, 'projects/index.html'),
                skyline: resolve(__dirname, 'skyline/index.html'),
                FerrisWheel: resolve(__dirname, 'FerrisWheel/index.html'),
            }
        }
    }
});