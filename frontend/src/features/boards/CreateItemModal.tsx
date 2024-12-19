import { Button, Form, Input, Modal, Select, Space } from "antd"
import { ItemType, TaskItem } from "./BoardsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createItemAsync, createItemModalOpened, selectCreateItemModalStatus, selectCurrentBoardId } from "./BoardsSlice";

type FormValues = {
  name: string
  type: ItemType
  description: string
}

export const CreateItemModal: React.FC = () => {
  const dispatch = useAppDispatch()

  const [form] = Form.useForm<FormValues>()

  const isCreateItemModalOpen = useAppSelector(selectCreateItemModalStatus)
  const currentBoardId = useAppSelector(selectCurrentBoardId)

  const handleOk = () => {
    dispatch(createItemModalOpened({ open: false, boardId: undefined }))
  }

  const handleCancel = () => {
    dispatch(createItemModalOpened({ open: false, boardId: undefined }))
  }

  const onFinish = (values: FormValues) => {
    const newItem: TaskItem = { //todo add more type of items
      boardId: currentBoardId!, //todo remove that stupid !
      name: values.name,
      type: values.type,
      description: values.description
    }

    dispatch(createItemAsync(newItem))
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
          <Input.TextArea autoSize={{ minRows: 3 }} />
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