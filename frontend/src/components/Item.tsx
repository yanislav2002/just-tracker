import { Avatar, Card } from "antd"
import { useDrag } from "react-dnd"


type DropResult = {
  name: string
}

export const Item: React.FC = () => {
  const [isDragging, drag] = useDrag(() => ({
    type: 'box',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  // const opacity = isDragging ? 0.4 : 1
  return (
    <Card ref={drag} bordered={false} size={"small"} style={{ margin: '5px' }}>
      <Card.Meta
        // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
        title="Task"
        description={
          <p style={{ marginBottom: 0, marginTop: 0 }}>Clean the kitchen</p>
        }
      />
    </Card>
  )
}