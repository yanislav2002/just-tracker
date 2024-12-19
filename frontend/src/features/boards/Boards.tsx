import { Row, Button, Flex } from 'antd'
import { createBoardModalOpened, getAllBoardsAsync, selectAllBoards } from './BoardsSlice'
import { Board } from '../../components/Board'
import CreateBoardModal from './CreateBoardModal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useEffect } from 'react'
import { selectAuthDetails } from '../auth/AuthSlice'
import { CreateItemModal } from './CreateItemModal'


export const Boards: React.FC = () => {
  const dispatch = useAppDispatch()

  const { userId } = useAppSelector(selectAuthDetails)
  const boards = useAppSelector(selectAllBoards)

  const onCreateBoardClick = () => {
    dispatch(createBoardModalOpened(true))
  }

  useEffect(() => {
    if (userId) {
      dispatch(getAllBoardsAsync(userId))
      console.log(1)
    }
  }, [dispatch])

  return (
    <Row justify='center'>
      <CreateBoardModal />
      <CreateItemModal />
      <Flex gap='2em' vertical justify='center' style={{ width: '80vw', minWidth: '800px' }}>
        <Flex gap='1em'>
          <Button onClick={onCreateBoardClick} type='primary'>
            Create Board
          </Button>
          <Button type='primary'>Filter</Button>
        </Flex>

        {boards.map((board) => (
          <Board key={board.id} {...board} />
        ))}
      </Flex>
    </Row>
  )
}
