import React, { createContext, useContext, useMemo, useState } from 'react'
import auth from '../services/auth'

export type User = {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  email: string
  username: string
  image: string
}

type SigninFn = (
  username: string,
  password: string,
  callback?: () => void,
) => Promise<void>

type SignoutFn = (callback?: () => void) => void

type AuthStatus =
  | 'unauthenticated'
  | 'authenticating'
  | 'authenticated'
  | 'error'

type Auth = {
  user: User | null
  signin: SigninFn
  signout: SignoutFn
  status: AuthStatus
  error: string | null
  token?: string
}

const INITIAL_STATE: Auth = {
  user: null,
  signin: () => Promise.resolve(),
  signout: () => null,
  status: 'unauthenticated',
  error: null,
}

const AuthContext = createContext(INITIAL_STATE)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | undefined>()
  const [status, setStatus] = useState<AuthStatus>('unauthenticated')
  const [error, setError] = useState<string | null>(null)

  const signin: SigninFn = async (
    username: string,
    password: string,
    callback?: () => void,
  ) => {
    try {
      setStatus('authenticating')

      const { token: authToken, ...authUser } = await auth.signin(
        username,
        password,
      )

      setUser(authUser)
      setToken(authToken)

      setStatus('authenticated')

      if (callback != null) {
        callback()
      }
    } catch {
      setStatus('error')
      setError('authentication error')
    }
  }

  const signout: SignoutFn = (callback?: () => void) => {
    setUser(null)
    setToken(undefined)
    setStatus('unauthenticated')
    setError(null)

    if (callback != null) {
      callback()
    }
  }

  const value = useMemo<Auth>(
    () => ({ user, signin, signout, status, error, token }),
    [error, status, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
