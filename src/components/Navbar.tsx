import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Separator } from '@/components/ui/separator'

const Navbar = () => {
  return (
    <nav className='bg-background flex flex-row items-center h-8 shadow-md'>
      <Button variant='link' asChild>
        <Link to='/'>Logo</Link>
      </Button>
      <Separator orientation='vertical' />
      <Button variant='link' asChild>
        <Link to='/sale'>Savdo</Link>
      </Button>
      <Separator orientation='vertical' />

      <Button variant='link' asChild>
        <Link to='/clients'>Mijozlar</Link>
      </Button>
      <Separator orientation='vertical' />

      <Button variant='link' asChild>
        <Link to='/suppliers'>Ta'minotchilar</Link>
      </Button>
      <Separator orientation='vertical' />

      <Button variant='link' asChild>
        <Link to='/intake'>Kirim</Link>
      </Button>
    </nav>
  )
}

export default Navbar
