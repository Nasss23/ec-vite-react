/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { Label } from '../../label'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { fetchListCategory, resetUpadateCategory, updateACategory } from '../../../redux/slice/category.slice'
import { toast } from 'react-toastify'

const ModalCategoryUpdate = (props: any) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, data } = props

  const { handleSubmit } = useForm({ mode: 'onSubmit' })
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [_id, setId] = useState<string>('')

  const dispatch = useAppDispatch()
  const isUpdateSuccess = useAppSelector((state) => state.category.isUpdateSuccess)

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchListCategory())
    }
    fetchData()

    if (isUpdateSuccess === true) {
      setIsOpenUpdateModal(false)
      toast.success('Sửa danh mục thành công')
      dispatch(resetUpadateCategory())
    }
  }, [isUpdateSuccess])

  const handleUpdate = () => {
    dispatch(updateACategory({ name, description, _id }))
  }

  useEffect(() => {
    if (data._id) {
      setId(data._id)
      setName(data.name)
      setDescription(data.description)
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

export default ModalCategoryUpdate
