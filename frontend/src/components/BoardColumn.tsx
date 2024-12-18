import { Flex } from "antd"
import { useDrop } from "react-dnd"
import { Item } from "../features/boards/BoardsApi"
import { Item as ItemComponent } from "./Item"


type BoardColumnProps = {
  items: Item[]
  columnWidth: string
  columnKey: string
  boardId: string
}

export const BoardColumn: React.FC<BoardColumnProps> = ({ columnKey, items, columnWidth, boardId }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: `${boardId}-${columnKey}` }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = 'white'
  if (isActive) {
    backgroundColor = '#99EDC3'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <Flex justify='end' vertical style={{ minWidth: '200px', width: columnWidth }}>
      <Flex align='center' justify='center' style={{ height: '3em', background: '#EFF1ED' }}>
        <h4>{columnKey}</h4>
      </Flex>
      <Flex ref={drop} vertical style={{ backgroundColor, minHeight: '6em' }}>
        {/* //todo space for items */}
        <p></p>
        <ItemComponent></ItemComponent>
        <ItemComponent></ItemComponent>
        <ItemComponent></ItemComponent>
        <ItemComponent></ItemComponent>
      </Flex>
    </Flex>
  )
}