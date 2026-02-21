import React, { useMemo, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { usernameToEmail } from '../lib/loginEmail'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
  const [mode, setMode] = useState('login') // login | signup
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from || '/c/demo'
  const email = useMemo(() => usernameToEmail(username), [username])

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (!username.trim()) throw new Error('Informe um usuário.')
      if (password.length < 6) throw new Error('A senha precisa ter pelo menos 6 caracteres.')
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      nav(from, { replace: true })
    } catch (err) {
      setError(err?.message || String(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="center">
      <div className="authCard">
        <h1>Ficha The Dark Eye</h1>

        <form onSubmit={onSubmit} className="authForm">
          <label className="field">
            <div className="field__label">Usuário</div>
            <input className="input" value={username} onChange={e => setUsername(e.target.value)} autoFocus />
          </label>

          <label className="field">
            <div className="field__label">Senha</div>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>

          {error ? <div className="error">{error}</div> : null}

          <button className="btn btn--primary" disabled={busy}>
            {busy ? 'Aguenta…' : (mode === 'signup' ? 'Criar conta' : 'Entrar')}
          </button>

          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          >
            {mode === 'signup' ? 'Já tenho conta' : 'Quero criar uma conta'}
          </button>
        </form>
      </div>
    </div>
  )
}
