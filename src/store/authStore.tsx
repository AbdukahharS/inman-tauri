import { create } from 'zustand'
import Database from '@tauri-apps/plugin-sql'

interface AuthState {
  isAuthenticated: boolean
  user: string | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: true,

  // Check authentication status on app load
  checkAuth: () => {
    const sessionUser = sessionStorage.getItem('user')
    if (sessionUser) {
      set({ user: sessionUser, isAuthenticated: true, loading: false })
    } else {
      set({ loading: false })
    }
  },

  // Login function
  login: async (username, password) => {
    set({ loading: true }) // Start loading
    try {
      const db = await Database.load('sqlite:test.db')
      const dbCredentials = await db.select<{ username: string }[]>(
        'SELECT * FROM credentials WHERE username = ? AND password = ?',
        [username, password]
      )

      if (dbCredentials.length === 1) {
        sessionStorage.setItem('user', username)
        set({ user: username, isAuthenticated: true })
      } else {
        throw new Error('Noto‘g‘ri ism yoki parol.')
      }
    } catch (error) {
      console.error('Login failed', error)
    } finally {
      set({ loading: false }) // Stop loading
    }
  },

  // Logout function
  logout: () => {
    sessionStorage.removeItem('user')
    set({ user: null, isAuthenticated: false })
  },
}))
