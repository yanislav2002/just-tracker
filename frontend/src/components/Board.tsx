import { BoardModel } from '../features/boards/BoardsApi'
import './Board.css'
import { Button, Collapse, Flex, Space } from 'antd'
import { BoardColumn } from './BoardColumn'


export const Board: React.FC<BoardModel> = (board: BoardModel) => {
  const columnWidth = `${80 / Object.keys(board.columns).length}vw`

  const onStopPropagation = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
  }

  const columns = (
    <Space style={{ width: '100%', display: 'flex' }}>
      {Object.entries(board.columns).map(([key, items]) => (
        <BoardColumn {...items} key={key} />
      ))}
    </Space>
  )

  return (
    <Flex vertical>
      <Collapse style={{ padding: 0 }} items={[{
        key: board.id, label: board.name, children: columns, extra: <Button onClick={onStopPropagation} />
      }]} />
    </Flex>
  )
}
