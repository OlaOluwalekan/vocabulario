import SearchForm from '@/components/home/SearchForm'
import WordList from '@/components/home/WordList'

const HomePage = ({ searchParams }: { searchParams: any }) => {
  // console.log(searchParams)

  return (
    <div className='w-[90%] h-[calc(100vh-100px)] m-auto bg-base-100'>
      <SearchForm />
      <WordList q={searchParams.q} language={searchParams.language} />
    </div>
  )
}

export default HomePage
