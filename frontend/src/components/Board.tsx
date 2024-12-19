import { BoardModel } from '../features/boards/BoardsApi'
import './Board.css'
import { Button, Collapse, Flex, Space } from 'antd'
import { BoardColumn } from './BoardColumn'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../app/hooks'
import { createItemModalOpened, deleteBoardAsync } from '../features/boards/BoardsSlice'


export const Board: React.FC<BoardModel> = (board: BoardModel) => {
  const columnWidth = `${80 / Object.keys(board.columns).length}vw`

  // const isCreateItemModalOpen = useAppSelector(selectCreateItemModalStatus)

  const dispatch = useAppDispatch()

  const onAddTicketClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    
    dispatch(createItemModalOpened({open: true, boardId: board.id}))
  }

  const onDeleteBoardClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    
    dispatch(deleteBoardAsync(board.id!)) //todo remove !
  }

  const columns = (
    <Space style={{ width: '100%', display: 'flex', alignItems: 'stretch' }}>
      {Object.entries(board.columns).map(([key, items]) => (
        <BoardColumn items={items} columnWidth={columnWidth} boardId={board.id!} columnKey={key} key={key} /> //todo remove !
      ))}
    </Space>
  )

  const boardOptions = (
    <Flex gap='middle'>
      {/* <Button icon={<SettingOutlined />}></Button> */}
      <Button icon={<PlusOutlined />} onClick={onAddTicketClick} />
      <Button danger icon={<DeleteOutlined />} onClick={onDeleteBoardClick} />
    </Flex>
  )

  return (
    <Flex vertical>
      <p>{board.id}</p>
      <Collapse style={{ overflow: 'hidden' }} items={[{ key: board.id, label: board.name, children: columns, extra: boardOptions }]} />
    </Flex>
  )
}
