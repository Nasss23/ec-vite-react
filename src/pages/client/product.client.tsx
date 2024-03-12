/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { createCategory } from '../../config/api'
import { Input } from '../../components/input'
import { useForm } from 'react-hook-form'

const ProductPage = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onSubmit'
  })
  const [name, setName] = useState('')
  const [des, setDes] = useState('')

  const handle = async (e: any) => {
    await createCategory(name, des)
  }
  return (
    <form onSubmit={handleSubmit(handle)} className='flex flex-col'>
      <Input
        placeholder='Email address'
        name='name'
        onChange={(e) => setName(e.target.value)}
        control={control}
      ></Input>
      <Input
        placeholder='Email address'
        name='username'
        onChange={(e) => setDes(e.target.value)}
        control={control}
      ></Input>
      <button type='submit'>submit</button>
    </form>
  )
}

export default ProductPage
