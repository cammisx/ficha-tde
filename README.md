# Ficha The Dark Eye (React + Firebase)

## Rodar local
1. `npm i`
2. Copie `.env.example` para `.env` e preencha.
3. `npm run dev`

## Deploy no Vercel
- Build: `npm run build`
- Output: `dist`
- Variáveis de ambiente: as mesmas do `.env`

## Login (usuário + senha, sem email)
A tela pede "Usuário" e "Senha". Internamente, convertemos `usuario` em email:
`usuario@<VITE_LOGIN_EMAIL_DOMAIN>`

Assim dá pra usar Firebase Auth (Email/Senha) sem você precisar pedir email na UI.
