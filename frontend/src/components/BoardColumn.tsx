import { Flex } from "antd"
import { useDrop } from "react-dnd"
import { Item } from "../features/boards/BoardsApi"


export const BoardColumn: React.FC<Item[]> = (itmes) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'TODO' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <Flex justify='end' vertical style={{ border: 'solid black 1px', width: '100%', flexGrow: 1}}>
      <Flex style={{  height: '2em', width: '100%'}}>
        //todo name of column]
        <p>{}</p>
      </Flex>
      <Flex ref={drop} vertical style={{ backgroundColor }}>
        //todo space for items

      </Flex>
    </Flex>
  )
}