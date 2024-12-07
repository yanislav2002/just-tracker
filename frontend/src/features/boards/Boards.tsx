import { Row, Button, Flex, Collapse } from 'antd'
import { createBoardModalOpened } from './BoardsSlice'
import { Board } from '../../components/Board'
import CreateBoardModal from './CreateBoardModal'
import { useAppDispatch } from '../../app/hooks'

export const Boards: React.FC = () => {
  const dispatch = useAppDispatch()

  const onCreateBoardClick = () => {
    dispatch(createBoardModalOpened(true))
  }

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

        <Collapse style={{ padding: 0 }} items={[{ key: '1', label: 'This is default size panel header', children: <Board /> }]} />
      </Flex>
    </Row>
  )
}
