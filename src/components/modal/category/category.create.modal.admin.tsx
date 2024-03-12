/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '../../label'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { createACategory, fetchListCategory, resetCreateCategory } from '../../../redux/slice/category.slice'
import { toast } from 'react-toastify'

const ModalCategoryCreate = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props

  const { handleSubmit } = useForm({ mode: 'onSubmit' })
  const dispatch = useAppDispatch()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const isCreateSuccess = useAppSelector((state) => state.category.isCreateSuccess)

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchListCategory())
    }
    fetchData()
    if (isCreateSuccess === true) {
      setIsOpenCreateModal(false)
      setName('')
      setDescription('')
      toast.success('Thêm danh mục thành công')
      dispatch(resetCreateCategory())
    }
  }, [dispatch, isCreateSuccess])

  const handleCreate = async () => {
    dispatch(createACategory({ name, description }))
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
          <Label htmlFor='input'>Category Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='description'>Description</Label>
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default ModalCategoryCreate
