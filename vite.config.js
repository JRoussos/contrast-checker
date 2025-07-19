import { defineConfig } from 'vite'
import { resolve } from 'pathe'

import dts from 'vite-plugin-dts'

export default defineConfig({
    server: {
        open: '/demo/index.html',
    },
    build: {
        target: "es2019",
        lib: {
            entry: resolve(__dirname, 'src/contrast-checker.js'),
            formats: ['cjs', 'es'],
            name: 'ContrastChecker',
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
    plugins: [
        dts (
            { insertTypesEntry: true }
        ),
    ],
})