import { Button, Form, Input, Modal, Select, Space } from 'antd'
import { createBoardModalOpened, postNewBoardAsync, selectCreateBoardModalStatus } from './BoardsSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { BoardModel, BoardType } from './BoardsApi'

type FormValues = {
  name: string
  type: BoardType
}

const CreateBoardModal: React.FC = () => {
  const dispatch = useAppDispatch()

  const [form] = Form.useForm<FormValues>()

  const isCreateBoardModalOpen = useAppSelector(selectCreateBoardModalStatus)

  const handleOk = () => {
    dispatch(createBoardModalOpened(false))
  }

  const handleCancel = () => {
    dispatch(createBoardModalOpened(false))
  }

  const onFinish = (values: FormValues) => {
    const newBoard: BoardModel = {
      name: values.name,
      type: values.type,
      columns: {
        todo: [],
        inProgress: [],
        done: [],
      },
      isCompleted: false,
      deadline: '',
      color: '',
    }

    dispatch(postNewBoardAsync(newBoard))
  }

  const boardTypes: { value: BoardType; label: string }[] = [
    { value: 'dailyRoutinesBoard', label: 'Daily Routines Board' },
    { value: 'projectBoard', label: 'Project Board' },
    { value: 'customBoard', label: 'Custom Board' },
  ]

  return (
    <Modal title='Create Board' open={isCreateBoardModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item label='Board Name' name='name'>
          <Input />
        </Form.Item>

        <Form.Item label='Board Type' name='type'>
          <Select>
            {boardTypes.map((board) => (
              <Select.Option key={board.value} value={board.value}>
                {board.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Create
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateBoardModal
