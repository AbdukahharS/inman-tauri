import { useEffect } from 'react'
import Database from '@tauri-apps/plugin-sql'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import { ThemeProvider } from 'next-themes'
import './App.css'
import Register from './pages/Register'
import { Toaster } from '@/components/ui/sonner'
// import { AuthProvider, useAuth } from './contexts/AuthContext'
import Sale from './pages/Sale'
import Clients from './pages/Clients'
import Suppliers from './pages/Suppliers'
import { useAuthStore } from './store/authStore'

type Credential = {
  id: number
  username: string
  password: string
}

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const { isAuthenticated, loading } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      checkAuth()
    }
  }, [isAuthenticated, loading])

  useEffect(() => {
    const checkDBCredentials = async () => {
      try {
        const db = await Database.load('sqlite:test.db')

        // First check if the table exists before querying it
        const tableCheck = await db.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='credentials'
    `)

        if (tableCheck.rowsAffected === 0) {
          console.log('Credentials table does not exist')
          return (window.location.href = '/register')
        }

        const dbCredentials = await db.select<Credential[]>(
          'SELECT * FROM credentials'
        )

        console.log(dbCredentials)

        if (typeof dbCredentials[0] !== 'object') {
          console.log('No credentials found')

          return (window.location.href = '/register')
        }
      } catch (error) {
        console.log(0, error)
      }
    }
    if (
      !isAuthenticated &&
      !loading &&
      window.location.pathname !== '/register' &&
      window.location.pathname !== '/login'
    ) {
      checkDBCredentials()
    }
  }, [isAuthenticated])

  return (
    <ThemeProvider defaultTheme='light'>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/sale' element={<Sale />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/suppliers' element={<Suppliers />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position='top-center' />
    </ThemeProvider>
  )
}

export default App

{
  /* <main className="container">
      <h1>Welcome to Tauri + SQLite</h1>

      {isLoadingUsers ? (
        <div>Loading users...</div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <form
            className="row"
            onSubmit={(e) => {
              e.preventDefault();
              setUser({ name, email });
              getUsers();
            }}>
            <input
              id="name-input"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter a name..."
            />
            <input
              type="email"
              id="email-input"
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Enter an email..."
            />
            <button type="submit">Add User</button>
          </form>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <h1>Users</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {error && <p>{error}</p>}
    </main> */
}

// async function getUsers() {
//   try {
//     const db = await Database.load("sqlite:test.db");
//     const dbUsers = await db.select<User[]>("SELECT * FROM users");

//     setError("");
//     setUsers(dbUsers);
//     setIsLoadingUsers(false);
//   } catch (error) {
//     console.log(error);
//     setError("Failed to get users - check console");
//   }
// }

// async function setUser(user: Omit<User, "id">) {
//   try {
//     setIsLoadingUsers(true);
//     const db = await Database.load("sqlite:test.db");

//     await db.execute("INSERT INTO users (name, email) VALUES ($1, $2)", [
//       user.name,
//       user.email,
//     ]);

//     getUsers().then(() => setIsLoadingUsers(false));
//   } catch (error) {
//     console.log(error);
//     setError("Failed to insert user - check console");
//   }
// }

// useEffect(() => {
//   getUsers();
// }, []);
