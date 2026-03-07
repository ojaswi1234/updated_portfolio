import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'http'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      {
        name: 'vercel-api-dev',
        configureServer(server) {
          // Load ALL .env vars into process.env so serverless handlers can read them
          const env = loadEnv(mode, server.config.root, '')
          for (const [key, value] of Object.entries(env)) {
            process.env[key] ??= value
          }

          server.middlewares.use('/api/visitors', async (req: IncomingMessage, res: ServerResponse) => {
            // Parse JSON body for POST requests
            if (req.method === 'POST') {
              const buffers: Buffer[] = []
              for await (const chunk of req) {
                buffers.push(chunk as Buffer)
              }
              try {
                ;(req as any).body = JSON.parse(Buffer.concat(buffers).toString())
              } catch {
                ;(req as any).body = {}
              }
            }

            // Add Vercel-compatible response helpers
            ;(res as any).status = (code: number) => {
              res.statusCode = code
              return res as any
            }
            ;(res as any).json = (data: unknown) => {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
            }

            const mod = await server.ssrLoadModule('/api/visitors.ts')
            await mod.default(req, res)
          })
        },
      },
    ],
  }
})
