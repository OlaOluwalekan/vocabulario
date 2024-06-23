import InputWithLabel from '../ui/inputs/InputWithLabel'
import PartsOfSpeechOptions from './PartsOfSpeechOptions'

const AddWordForm = () => {
  return (
    <form className='card shadow-xl w-96 mx-auto bg-base-200 mt-3 flex flex-col items-center justify-center px-3 py-5'>
      <InputWithLabel
        type='text'
        placeholder='Enter the Spanish word'
        label='Spanish word'
        name='spanish'
      />
      <InputWithLabel
        type='text'
        placeholder='Enter the English translation'
        label='English word'
        name='english'
      />
      <PartsOfSpeechOptions />
    </form>
  )
}

export default AddWordForm
