import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Divider, Typography, message } from 'antd';
import { useCreateBoardMutation, useUpdateBoardMutation } from '../../api/boards.api'
import type { CreateBoardProps } from '../../../../types/formBoard.type'

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

export const FormBoard = ( {board, mode}: CreateBoardProps ) => {
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);
    const navigate = useNavigate();

    const [createBoard] = useCreateBoardMutation();
    const [updateBoard] = useUpdateBoardMutation();

    useEffect(() => {
        if (mode === "edit" && board) {
            form.setFieldsValue({
                BoardName: board.name,
                Description: board.description,
            });
        }

    }, [board, mode, form]);

    const onFinish = async (values: any) => {
        const payload = {
            name: values.BoardName,
            description: values.Description,
        }

        try {

            if (mode === "create") {

                await createBoard(payload).unwrap();

                message.success("Board created successfully");

            }

            if (mode === "edit" && board) {

                await updateBoard({
                    id: board.id,
                    ...payload
                }).unwrap();

                message.success("Board updated successfully");

            }

            navigate("/boards");

        } catch (error) {

            message.error("Operation failed");

        }
    };

    return(
        <>
            <Divider/>
                <Title level={2}>{mode === "edit" ? "Edit board" : "Create board"}</Title>
                <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                    variant={variant || 'filled'}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    initialValues={{ variant: 'filled' }}
                    >

                    <Form.Item 
                        label="BoardName" 
                        name="BoardName" 
                        rules={[
                            { required: true, message: 'Please input!' },
                            { min: 3, message: "Name must be at least 3 characters" },
                            { max: 50, message: "Name must be less than 50 characters" }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="Description"
                        rules={[
                            { required: true, message: 'Please input!' },
                            { min: 3, message: "Name must be at least 3 characters" },
                            { max: 100, message: "Name must be less than 100 characters" }
                        ]}
                    >
                        <Input.TextArea />
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
