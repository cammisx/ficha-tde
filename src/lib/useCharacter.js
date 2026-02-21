import { useEffect, useMemo, useState } from 'react'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { DEFAULT_CHARACTER } from './defaultCharacter'
import { set as setPath } from './path'
import { useDebouncedEffect } from './useDebouncedEffect'

export function useCharacter(characterId) {
  const ref = useMemo(() => doc(db, 'characters', characterId), [characterId])
  const [data, setData] = useState(DEFAULT_CHARACTER)
  const [loading, setLoading] = useState(true)
  const [dirty, setDirty] = useState(false)
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved | error
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const snap = await getDoc(ref)
        if (!alive) return
        if (snap.exists()) {
          setData(snap.data())
        } else {
          // cria doc vazio
          await setDoc(ref, { ...DEFAULT_CHARACTER, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
          setData(DEFAULT_CHARACTER)
        }
      } catch (e) {
        if (!alive) return
        setError(e)
      } finally {
        if (!alive) return
        setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [ref])

  function update(path, value) {
    setData(prev => setPath(prev, path, value))
    setDirty(true)
  }

  // autosave
  useDebouncedEffect(() => {
    if (!dirty) return
    let cancelled = false
    ;(async () => {
      setSaveState('saving')
      try {
        await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true })
        if (cancelled) return
        setDirty(false)
        setSaveState('saved')
        setTimeout(() => {
          if (!cancelled) setSaveState('idle')
        }, 800)
      } catch (e) {
        if (cancelled) return
        setSaveState('error')
        setError(e)
      }
    })()
    return () => { cancelled = true }
  }, [data, dirty, ref], 600)

  return { data, update, loading, saveState, error, setData }
}
