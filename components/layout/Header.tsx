import Link from 'next/link'
import ButtonLink from '../ui/buttons/ButtonLink'

const Header = () => {
  return (
    <header className='px-3 py-5 flex justify-between items-center shadow-md'>
      <Link href='/' className='text-2xl font-bold'>
        Vocabulario
      </Link>

      <nav>
        <ButtonLink href='/words/add' text='Add Word' />
      </nav>
    </header>
  )
}

export default Header
