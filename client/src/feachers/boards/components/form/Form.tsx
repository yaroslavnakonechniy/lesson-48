import { Button, Form, Input, Divider, Typography, message } from 'antd';
import { useEffect } from 'react';
import { useCreateBoardMutation, useUpdateBoardMutation } from '../../api/boards.api';
import type { Board } from '../../api/boards.api';
import { useNavigate } from 'react-router-dom';

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

type Props = {
  board?: Board;
  mode: "create" | "edit";
};
//форма для створення і редагування проекта, взалежності від кліку на кнопки Create/Edit кнопки форми будуть відповідати натиснутій.
export const FormBoard = ( {board, mode}: Props ) => {
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);
    const navigate = useNavigate();

    const [createBoard] = useCreateBoardMutation();
    const [updateBoard] = useUpdateBoardMutation();

    useEffect(() => {
        if (mode === "edit" && board) {
        form.setFieldsValue({
            ProjectName: board.name,
            AuthorId: board.authorId,
            Description: board.description,
        });
        }
    }, [board, mode, form]);

    const onFinish = async (values: any) => {
        const payload = {
            name: values.ProjectName,
            description: values.Description,
            authorId: values.AuthorId
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
                <Title level={2}>Form Project</Title>
                <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                    variant={variant || 'filled'}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    initialValues={{ variant: 'filled' }}
                    >

                    <Form.Item label="ProjectName" name="ProjectName" 
                        rules={[
                            { required: true, message: 'Please input!' },
                            { min: 3, message: "Name must be at least 3 characters" },
                            { max: 50, message: "Name must be less than 50 characters" }
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="Description"
                        rules={[{ required: true, message: 'Please input!' }]}
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
