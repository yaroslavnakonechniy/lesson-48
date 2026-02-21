import { useParams } from 'react-router-dom';
import { Button, DatePicker, Form, Input, Divider, Typography } from 'antd';

const { RangePicker } = DatePicker;
const { Title } = Typography

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const FormTask = () => {
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);

    const {taskId} = useParams<{taskId: string}>();
    const {projectId} = useParams<{projectId: string}>();

    return(
        <>
            <Divider/>
                <Title level={2}>Form Task</Title>
                <Title level={2}>ProjectID:{projectId}</Title>
                <Title level={2}>TaskID:{taskId}</Title>
                <Form
                    {...formItemLayout}
                    form={form}
                    variant={variant || 'filled'}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    initialValues={{ variant: 'filled' }}
                    >

                    <Form.Item label="title" name="title" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="workflow" name="workflow" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item label="boardId" name="boardId" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="authorId" name="AuthorId" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="Description"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="RangePicker"
                        name="RangePicker"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <RangePicker />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            <Divider/>
        </>
    )
}