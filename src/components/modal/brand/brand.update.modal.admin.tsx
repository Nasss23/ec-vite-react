/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { fetchListBrand, resetUpadateBrand, updateABrand } from '../../../redux/slice/brand.slice'
import { Label } from '../../label'
import { toast } from 'react-toastify'

const ModalBrandUpdate = (props: any) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, data } = props

  const { handleSubmit } = useForm({ mode: 'onSubmit' })
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [_id, setId] = useState<string>('')

  const dispatch = useAppDispatch()
  const categoryData = useAppSelector((state) => state.category.listCategory)
  const isUpdateSuccess = useAppSelector((state) => state.brand.isUpdateSuccess)

  const value = categoryData.data
  const options = value.map((item) => ({
    label: <span>{item.description}</span>,
    value: item._id
  }))

  useEffect(() => {
    dispatch(fetchListBrand())

    if (isUpdateSuccess === true) {
      setIsOpenUpdateModal(false)
      toast.success('Cập nhật thành công')
      dispatch(resetUpadateBrand())
    }
  }, [isUpdateSuccess])

  const handleUpdate = () => {
    dispatch(updateABrand({ name, description, _id, category }))
  }

  const handleCategoryChange = (category: any) => {
    setCategory(category)
  }

  useEffect(() => {
    if (data?._id) {
      setId(data?._id)
      setName(data?.name)
      setDescription(data?.description)
      setCategory(data?.category._id)
    }
  }, [data])

  return (
    <Modal
      title='Create a category'
      open={isOpenUpdateModal}
      onCancel={() => setIsOpenUpdateModal(false)}
      footer={null}
      width={500}
    >
      <form className='space-y-3' onSubmit={handleSubmit(handleUpdate)}>
        <div className='space-y-1'>
          <Label htmlFor='input'>Brand Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='description'>Description</Label>
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='category'>Category</Label>
          <Select value={category} onChange={handleCategoryChange} options={options} className='w-full' />
        </div>
        <div className='flex justify-center'>
          <Button type='primary' htmlType='submit' className='w-[200px] bg-blue-500'>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ModalBrandUpdate
