import { Button, Modal } from 'antd'
import { newBoardModalOpened, selectNewBoardModalStatus } from './BoardsSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const NewBoardModal: React.FC = () => {
  const dispatch = useAppDispatch()

  const isNewBoardModalOpen = useAppSelector(selectNewBoardModalStatus)

  const handleOk = () => {
    dispatch(newBoardModalOpened(false))
  }

  const handleCancel = () => {
    dispatch(newBoardModalOpened(false))
  }

  return (
    <Modal title='Basic Modal' open={isNewBoardModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default NewBoardModal
