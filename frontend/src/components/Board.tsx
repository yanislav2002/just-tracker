import './Board.css'

import { Flex, Table } from 'antd'

const columns = [
  {
    title: 'TODO',
    dataIndex: 'todo',
    key: 'todo',
  },
  {
    title: 'IN PROGRESS',
    dataIndex: 'inProgress',
    key: 'inProgress',
  },
  {
    title: 'DONE',
    dataIndex: 'done',
    key: 'done',
  },
]

const dataSource = [
  {
    todo: ['done', 'not done'],
    inProgress: 'done',
    done: 'done',
  },
]

export const Board: React.FC = () => {
  const columnWidth = `${80 / 3}vw`

  const updatedColumns = columns.map((col) => ({ ...col, width: columnWidth }))

  return (
    <Flex vertical>
      <Table columns={updatedColumns} dataSource={dataSource} pagination={false} />
    </Flex>
  )
}
