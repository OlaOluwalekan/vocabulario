const InputWithLabel = ({
  type,
  placeholder,
  label,
  name,
}: {
  type: string
  placeholder: string
  label: string
  name?: string
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
      />
    </label>
  )
}

export default InputWithLabel
