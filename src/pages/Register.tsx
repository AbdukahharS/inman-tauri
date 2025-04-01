import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Database from '@tauri-apps/plugin-sql'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordRepeat, setPasswordRepeat] = useState<string>('')

  const handleSubmit = async () => {
    if (!name || !password || !passwordRepeat) {
      toast.warning("Iltimos, barcha maydonlarni to'ldiring.")
      return
    }

    if (password !== passwordRepeat) {
      toast.warning('Parollar mos kelmayapti.')
      return
    }

    try {
      const db = await Database.load('sqlite:test.db')

      await db.execute(
        'INSERT INTO credentials (username, password) VALUES ($1, $2)',
        [name, password]
      )

      toast.success("Muvaffaqiyatli ro'yxatdan o'tildi!")
      navigate('/login')
    } catch (error) {
      console.error(error)
      toast.error(error as string)
    }
  }

  return (
    <main className='bg-accent w-full h-screen flex justify-center items-center'>
      <div className='w-full max-w-lg border shadow-lg p-6 rounded-xl bg-background'>
        <h1 className='text-3xl font-bold mb-6 dark:hidden text-center'>
          InManga Ism va Parol qo'yish
        </h1>
        <Input
          type='text'
          id='name'
          placeholder='Ism'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type='password'
          id='password'
          placeholder='Parol'
          className='mt-4'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type='password'
          id='passwordRepeat'
          placeholder='Parolni takrorlang'
          className='mt-4'
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
        <Button className='w-full mt-6' onClick={handleSubmit}>
          Yuborish
        </Button>
        <Button
          variant='link'
          asChild
          className='text-center mt-4 mx-auto block'
        >
          <Link to='/login'>Kirish</Link>
        </Button>
      </div>
    </main>
  )
}

export default Register
