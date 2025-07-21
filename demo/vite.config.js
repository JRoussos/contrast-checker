import { defineConfig } from 'vite'
import { resolve } from 'pathe'

export default defineConfig({
    build: {
        target: "es2019",
        emptyOutDir: false,
        outDir: './demo/',
        rollupOptions: {
            input: [
                resolve(__dirname, 'src/index.js'),
            ],
            output: {
                entryFileNames: '[name].js',
                format: 'iife',
            },
            external: ['../dist/contrast-checker.js']
        }
    },
    esbuild: {
        target: "es2019"
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "es2019",
        }
    },
})