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
                projects: resolve(__dirname, 'projects/index.html'),
                skyline: resolve(__dirname, 'skyline/index.html'),
                FerrisWheel: resolve(__dirname, 'FerrisWheel/index.html'),
                Roman: resolve(__dirname, 'Roman/index.html'),
                Cat: resolve(__dirname, 'Cat/index.html'),
                RockPaper: resolve(__dirname, 'RockPaper/index.html'),
                Bus: resolve(__dirname, 'Bus/index.html'),
                Cash: resolve(__dirname, 'Cash/index.html'),
                notesApp: resolve(__dirname, 'Notes-App/index.html'),
                creature: resolve(__dirname, 'Creature/index.html'),
               /* notesAppServer: resolve(__dirname, 'Notes-App/server.js'), */
                telephone: resolve(__dirname, 'telephone/index.html'),
            }
        },
    }
});