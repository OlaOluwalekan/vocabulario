import Link from 'next/link'

const ButtonLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      href={href}
      className='bg-primary px-5 py-2 rounded-md text-primary-content'
    >
      {text}
    </Link>
  )
}

export default ButtonLink
