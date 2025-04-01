import React, { createContext, useState, useContext, useEffect } from 'react'
import Database from '@tauri-apps/plugin-sql'

// Define the shape of the auth context
interface AuthContextType {
  isAuthenticated: boolean
  user: string | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

// Default values for the context
const defaultContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>(defaultContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user')
    if (sessionUser) {
      setUser(sessionUser)
      setIsAuthenticated(true)
    }
    setLoading(false) // Set loading to false after checking session storage
  }, [])

  const login = async (username: string, password: string) => {
    setLoading(true) // Set loading to true when login starts
    try {
      const db = await Database.load('sqlite:test.db')

      const dbCredentials = await db.select<Credential[]>(
        'SELECT * FROM credentials WHERE username = ? AND password = ?',
        [username, password]
      )
      if (dbCredentials.length === 1) {
        sessionStorage.setItem('user', username)
        setUser(username)
        setIsAuthenticated(true)
      } else {
        throw new Error('Noto\'g\'ri ism yoki parol.')
      }
    } catch (error) {
      console.error('Login failed', error)
    } finally {
      setLoading(false) // Set loading to false after login attempt ends
    }
  }

  const logout = () => {
    sessionStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
