import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async () => {
    if (!name || !password) {
      toast.warning('Iltimos, barcha maydonlarni to\'ldiring.')
      return
    }

    try {
      await login(name, password)

      toast.success('Muvaffaqiyatli kirish!')
      navigate('/')
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message)
    }
  }
  return (
    <main className='bg-accent w-full h-screen flex justify-center items-center'>
      <div className='w-full max-w-lg border shadow-lg p-6 rounded-xl bg-background'>
        <h1 className='text-3xl font-bold mb-6 dark:hidden text-center'>InManga Kirish</h1>
        <Input type='text' id='name' placeholder='Ism' value={name} onChange={e => setName(e.target.value)} />
        <Input type='password' id='password' placeholder='Parol' className='mt-4' value={password} onChange={e => setPassword(e.target.value)} />
        <Button className='w-full mt-6' onClick={handleSubmit}>Kirish</Button>
      </div>
    </main>
  )
}

export default Login
