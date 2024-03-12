/* eslint-disable @typescript-eslint/no-explicit-any */
import { useController } from 'react-hook-form'

interface IProps {
  control: any
  placeholder: string
  errors?: any
  name: any
  type?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: IProps) => {
  const { control, name, placeholder = '', type = 'text', value, errors, onChange, ...prop } = props
  const { field } = useController({ control, name, defaultValue: '' })
  return (
    <input
      id={name}
      type={type}
      className={`py-4 px-2.5 border rounded w-full text-sm leading-5 ${
        errors ? 'border-red-500 placeholder:text-red-500' : 'border-neutral-200'
      }`}
      placeholder={placeholder}
      {...field}
      {...prop}
    />
  )
}

export default Input
