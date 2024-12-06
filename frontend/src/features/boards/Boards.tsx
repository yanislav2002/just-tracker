import { Row, Button, Flex, Collapse } from 'antd'
import { BoardModel, newBoardModalOpened } from './BoardsSlice'
import { Board } from './Board'
import NewBoardModal from './NewBoardModal'
import { useAppDispatch } from '../../app/hooks'

export const Boards: React.FC = () => {
  const dispatch = useAppDispatch()

  const board1: BoardModel = {
    name: 'ProjectBoard1',
    type: 'projectBoard',
    deadline: '',
    color: '',
    isCompleted: false,
    columns: {
      todo: [],
      inProgress: [],
      done: [],
    },
  }

  const onNewBoardClick = () => {
    dispatch(newBoardModalOpened(true))
  }

  return (
    <Row justify='center'>
      <NewBoardModal />
      <Flex gap='2em' vertical justify='center' style={{ width: '80vw', minWidth: '800px' }}>
        <Flex gap='1em'>
          <Button onClick={onNewBoardClick} type='primary'>
            New Board
          </Button>
          <Button type='primary'>Filter</Button>
        </Flex>

        <Collapse style={{ padding: 0 }} items={[{ key: '1', label: 'This is default size panel header', children: <Board /> }]} />
      </Flex>
    </Row>
  )
}
