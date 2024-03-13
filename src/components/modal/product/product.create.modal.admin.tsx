/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { Modal } from 'antd'
import { useForm } from 'react-hook-form'

const ModalProductCreate = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props
  const { handleSubmit } = useForm({ mode: 'onSubmit' })
  const dispatch = useAppDispatch()

  return (
    <Modal
      title='Create a category'
      open={isOpenCreateModal}
      onCancel={() => setIsOpenCreateModal(false)}
      footer={null}
      width={1000}
    ></Modal>
  )
}

export default ModalProductCreate
