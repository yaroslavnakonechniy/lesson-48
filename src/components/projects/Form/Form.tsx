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
//форма для створення і редагування проекта, взалежності від кліку на кнопки Create/Edit кнопки форми будуть відповідати натиснутій.
export const FormProject = () => {
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);

    return(
        <>
            <Divider/>
                <Title level={2}>Form Project</Title>
                <Form
                    {...formItemLayout}
                    form={form}
                    variant={variant || 'filled'}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    initialValues={{ variant: 'filled' }}
                    >

                    <Form.Item label="ProjectName" name="ProjectName" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item label="AuthorId" name="AuthorId" rules={[{ required: true, message: 'Please input!' }]}>
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