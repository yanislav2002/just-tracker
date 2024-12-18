import { Button, Form, Input, Modal, Select, Space } from "antd"
import { ItemType } from "./BoardsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createItemModalOpened, selectCreateItemModalStatus } from "./BoardsSlice";

type FormValues = {
  name: string
  type: ItemType
  description: string
}

export const CreateItemModal: React.FC = () => {
  const dispatch = useAppDispatch()

  const [form] = Form.useForm<FormValues>()

  const isCreateItemModalOpen = useAppSelector(selectCreateItemModalStatus)
  // const { userId } = useAppSelector(selectAuthDetails)

  const handleOk = () => {
    dispatch(createItemModalOpened(false))
  }

  const handleCancel = () => {
    dispatch(createItemModalOpened(false))
  }

  const onFinish = (values: FormValues) => {
    // const newBoard: BoardModel = {
    //   name: values.name,
    //   type: values.type,
    //   columns: getDefaultColumns(values.type),
    //   isCompleted: false,
    //   deadline: '',
    //   color: '',
    // }

    // if (userId) {
    //   dispatch(createBoardAsync({ newBoard, userId }))
    // }
  }

  const itemTypes: { value: ItemType; label: string }[] = [
    { value: 'task', label: 'Task' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <Modal title='Create Item' open={isCreateItemModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item label='Item Name' name='name'>
          <Input />
        </Form.Item>

        {/* //todo make it other component and insert it here */}
        <Form.Item label='Item Type' name='type'>
          <Select>
            {itemTypes.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label='Item Description' name='description'>
          <Input />
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