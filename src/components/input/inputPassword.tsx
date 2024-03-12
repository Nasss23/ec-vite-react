/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useController } from 'react-hook-form'
import { FaEyeSlash } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'

interface IProps {
  control: any
  placeholder: string
  errors?: any
  name: any
  type?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputPassword = (props: IProps) => {
  const { control, name = '', placeholder = '', type = 'text', value, errors, onChange, ...prop } = props
  const { field } = useController({ control, name, defaultValue: '' })
  const [showPassword, setShowpassword] = useState<boolean>(false)
  const handleTogglePassword = () => {
    setShowpassword(!showPassword)
  }
  return (
    <div className='relative'>
      <input
        id={name}
        type={showPassword ? 'text' : 'password'}
        className={`py-4 px-2.5 border rounded w-full text-sm leading-5 ${
          errors ? 'border-red-500 placeholder:text-red-500' : 'border-neutral-200'
        }`}
        placeholder={placeholder}
        {...field}
        {...prop}
      />
      <span
        className='absolute text-2xl -translate-y-1/2 right-[25px] text-iconColor transform top-1/2'
        onClick={handleTogglePassword}
      >
        {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
      </span>
    </div>
  )
}

export default InputPassword
