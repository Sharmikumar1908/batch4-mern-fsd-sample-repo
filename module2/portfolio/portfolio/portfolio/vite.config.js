import react from '@vitejs/plugin-react'
import { defineConfig, transformWithOxc } from 'vite'

const jsxInJavaScript = {
  name: 'jsx-in-javascript',
  enforce: 'pre',
  async transform(code, id) {
    const filePath = id.split('?')[0]

    if (!filePath.includes('/src/') || !filePath.endsWith('.js')) {
      return null
    }

    const result = await transformWithOxc(code, filePath, {
      lang: 'jsx',
      sourceType: 'module',
      jsx: { runtime: 'automatic' },
    })

    return { code: result.code, map: result.map }
  },
}

export default defineConfig({
  plugins: [jsxInJavaScript, react({ include: /\.(js|jsx)$/ })],
})
