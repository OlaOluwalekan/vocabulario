import SearchForm from '@/components/home/SearchForm'
import WordList from '@/components/home/WordList'

const HomePage = () => {
  return (
    <div className='w-[90%] h-[calc(100vh-100px)] m-auto bg-base-100'>
      <SearchForm />
      <WordList />
    </div>
  )
}

export default HomePage
