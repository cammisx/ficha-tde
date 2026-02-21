export function usernameToEmail(username) {
  const clean = String(username || '').trim().toLowerCase()
  const domain = import.meta.env.VITE_LOGIN_EMAIL_DOMAIN || 'tde.local'
  // evita caracteres estranhos no "email"
  const safe = clean.replace(/[^a-z0-9._-]/g, '')
  return `${safe}@${domain}`
}
