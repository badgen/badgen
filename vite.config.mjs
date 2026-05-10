import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const icons = require('./test/assets/icon-data-uri.js')
const staticAssetExtensions = new Set([
  '.css',
  '.gif',
  '.html',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.map',
  '.mjs',
  '.png',
  '.svg',
  '.ts',
  '.tsx',
  '.webp'
])

function isBadgePath(pathname) {
  return pathname.split('/').length > 2
    && !pathname.endsWith('/')
    && !staticAssetExtensions.has(path.extname(pathname).toLowerCase())
    && !pathname.startsWith('/@')
    && !pathname.startsWith('/node_modules/')
    && !pathname.startsWith('/src/')
    && !pathname.startsWith('/dist/')
    && !pathname.startsWith('/test/')
    && !pathname.startsWith('/preview/')
}

function parseRequestUrl(requestTarget) {
  const [rawPathname, rawQuery = ''] = requestTarget.split('?')

  if (rawPathname.startsWith('//')) {
    return {
      pathname: rawPathname,
      searchParams: new URLSearchParams(rawQuery)
    }
  }

  const requestUrl = new URL(requestTarget, 'http://localhost')
  return {
    pathname: requestUrl.pathname,
    searchParams: requestUrl.searchParams
  }
}

function createPreviewMiddleware(loadBadgen) {
  return async (req, res, next) => {
    if (!req.url) return next()

    const { pathname, searchParams } = parseRequestUrl(req.url)

    if (pathname === '/') {
      res.statusCode = 302
      res.setHeader('Location', '/preview/')
      res.end()
      return
    }

    if (pathname === '/favicon.ico') {
      res.statusCode = 404
      res.end()
      return
    }

    if (!['GET', 'HEAD'].includes(req.method || '') || !isBadgePath(pathname)) {
      return next()
    }

    const segments = pathname
      .split('/')
      .slice(1)
      .map(segment => decodeURIComponent(segment))

    const [subject, status, color] = segments
    const queryParams = Object.fromEntries(searchParams.entries())
    const iconName = queryParams.icon
    delete queryParams.icon

    try {
      const { badgen } = await loadBadgen()
      const svg = badgen({ subject, status, color, icon: icons[iconName], ...queryParams })

      res.statusCode = 200
      res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
      res.end(req.method === 'HEAD' ? undefined : svg)
    } catch (error) {
      next(error)
    }
  }
}

export default {
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: path.join(__dirname, 'src', 'index.ts')
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          entryFileNames: 'index.mjs'
        },
        {
          format: 'cjs',
          exports: 'named',
          entryFileNames: 'index.js'
        },
        {
          format: 'iife',
          name: '__badgenBundle',
          exports: 'named',
          entryFileNames: 'index.browser.js',
          footer: 'window.badgen = __badgenBundle.badgen;'
        }
      ]
    }
  },
  server: {
    open: '/preview/'
  },
  plugins: [{
    name: 'badgen-preview-routes',
    handleHotUpdate({ file, server }) {
      if (file.startsWith(path.join(__dirname, 'src') + path.sep)) {
        server.ws.send({ type: 'full-reload' })
      }
    },
    configureServer(server) {
      server.middlewares.use(createPreviewMiddleware(() => server.ssrLoadModule('/src/index.ts')))
    },
    configurePreviewServer(server) {
      server.middlewares.use(createPreviewMiddleware(async () => {
        const distPath = path.join(__dirname, 'dist', 'index.js')
        if (!fs.existsSync(distPath)) {
          throw new Error('Run `npm run build` before `vite preview`.')
        }

        return require(distPath)
      }))
    }
  }]
}
