import { Row, Button, Flex, Collapse } from 'antd'

export const Boards: React.FC = () => {
  return (
    <Row justify='center'>
      <Flex gap='2em' vertical justify='center' style={{ width: '80vw', minWidth: '800px' }}>
        <Flex gap='1em'>
          <Button type='primary'>New Board</Button>
          <Button type='primary'>Filter</Button>
        </Flex>

        <Collapse items={[{ key: '1', label: 'This is default size panel header', children: <p>{'hahah'}</p> }]} />
      </Flex>
    </Row>
  )
}
