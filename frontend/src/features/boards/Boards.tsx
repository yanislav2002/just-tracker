import { Row, Button, Flex, Collapse } from 'antd'
import { createBoardModalOpened, getAllBoardsAsync, selectAllBoards } from './BoardsSlice'
import { Board } from '../../components/Board'
import CreateBoardModal from './CreateBoardModal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { BoardColumn } from '../../components/BoardColumn'
import { Item } from '../../components/Item'
import { useEffect } from 'react'
import { selectAuthDetails } from '../auth/AuthSlice'


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
      <Flex gap='2em' vertical justify='center' style={{ width: '80vw', minWidth: '800px' }}>
        <Flex gap='1em'>
          <Button onClick={onCreateBoardClick} type='primary'>
            Create Board
          </Button>
          <Button type='primary'>Filter</Button>
        </Flex>

        {/* <Collapse style={{ padding: 0 }} items={[{ key: '1', label: 'This is default size panel header', children: <Board /> }]} /> */}
        {boards.map((board) => (
          <Board key={board.id} {...board} />
        ))}

        <Item></Item>
      </Flex>
    </Row>
  )
}
