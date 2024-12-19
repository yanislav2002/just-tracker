import { Flex } from "antd"
import { useDrop } from "react-dnd"
import { Item } from "../features/boards/BoardsApi"
import { ItemComponent } from "./Item"


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
    <Flex align="stretch" vertical style={{ minWidth: '200px', width: columnWidth, height: '100%' }}>
      <Flex align='center' justify='center' style={{ height: '3em', background: '#EFF1ED' }}>
        <h4>{columnKey}</h4>
      </Flex>
      <Flex ref={drop} vertical style={{ backgroundColor, minHeight: '6em', height: '100%' }}>
        {items.length > 0 ? (
          items.map(item => <ItemComponent key={item._id} itemProps={item} />)
        ) : (
          <div style={{ flexGrow: 1 }} /> //todo i dont like it
        )}
      </Flex>
    </Flex >
  )
}