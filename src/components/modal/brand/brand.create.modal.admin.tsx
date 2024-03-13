/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Label } from '../../label'
import { Button, Input, Modal, Select } from 'antd'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { createABrand, fetchListBrand, resetCreateBrand } from '../../../redux/slice/brand.slice'
import { toast } from 'react-toastify'

const ModalBrandCreate = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props

  const { handleSubmit } = useForm({ mode: 'onSubmit' })
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const dispatch = useAppDispatch()
  const categoryData = useAppSelector((state) => state.category.listCategory)
  const isCreateSuccess = useAppSelector((state) => state.brand.isCreateSuccess)

  useEffect(() => {
    dispatch(fetchListBrand())
    if (isCreateSuccess === true) {
      setIsOpenCreateModal(false)
      toast.success('Thêm thành công')
      dispatch(resetCreateBrand())
    }
  }, [isCreateSuccess])

  const value = categoryData.data
  const options = value.map((item) => ({
    label: <span>{item.name}</span>,
    value: item._id
  }))

  const handleCreate = () => {
    console.log({ name, description, category })
    dispatch(createABrand({ name, description, category }))
  }

  const handleCategoryChange = (category: any) => {
    setCategory(category)
  }

  return (
    <Modal
      title='Create a category'
      open={isOpenCreateModal}
      onCancel={() => setIsOpenCreateModal(false)}
      footer={null}
      width={500}
    >
      <form className='space-y-3' onSubmit={handleSubmit(handleCreate)}>
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
          <Select
            defaultValue='Chọn danh mục sản phẩm'
            onChange={handleCategoryChange}
            options={options}
            className='w-full'
          />
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

export default ModalBrandCreate
