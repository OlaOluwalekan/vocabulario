import { ReactEventHandler } from 'react'

const InputWithLabel = ({
  type,
  placeholder,
  label,
  name,
  value,
  handleChange,
}: {
  type: string
  placeholder: string
  label: string
  name?: string
  value?: string
  handleChange?: ReactEventHandler<HTMLInputElement>
}) => {
  return (
    <label className='form-control w-full'>
      <div className='label py-1'>
        <span className='label-text text-primary'>{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className='input input-bordered w-full'
        name={name}
        value={value}
        onChange={handleChange}
      />
    </label>
  )
}

export default InputWithLabel
