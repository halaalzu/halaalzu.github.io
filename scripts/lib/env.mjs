// Loads .env.local (gitignored) into process.env so credentials can live in a
// file instead of being typed on the command line. Values already present in
// the environment win, which is what CI wants — there the secrets come from
// GitHub Actions and no .env.local exists.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
)

const ENV_FILE = path.join(projectRoot, '.env.local')

export const loadEnv = () => {
  if (!existsSync(ENV_FILE)) return

  for (const line of readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (key && process.env[key] === undefined) process.env[key] = value
  }
}

/** Insert or replace a single KEY=value in .env.local, leaving the rest alone. */
export const saveEnv = (key, value) => {
  const existing = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, 'utf8') : ''
  const lines = existing.split('\n')
  const index = lines.findIndex((line) => line.trim().startsWith(`${key}=`))

  if (index === -1) {
    const body = existing.trimEnd()
    writeFileSync(ENV_FILE, `${body ? `${body}\n` : ''}${key}=${value}\n`, 'utf8')
  } else {
    lines[index] = `${key}=${value}`
    writeFileSync(ENV_FILE, lines.join('\n'), 'utf8')
  }

  return ENV_FILE
}
