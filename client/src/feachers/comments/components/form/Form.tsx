import { Button, Form, Input, Divider, Typography, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCreateCommentMutation, useUpdateCommentMutation } from "../../api/comments.api"
import type { CreateCommentProps } from "../../../../types/comment.type"

const { Title } = Typography

export const FormComment = ({comment, mode}: CreateCommentProps) => {
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);
    const navigate = useNavigate();
    const { taskId } = useParams<{ taskId: string }>();

    const [createComment] = useCreateCommentMutation();
    const [updateComment] = useUpdateCommentMutation();

    useEffect(() => {
        if (mode === "edit" && comment) {
            form.setFieldsValue({
                message: comment.message,
            });
        }

    }, [comment, mode, form]);

    const onFinish = async (values: any) => {
        console.log("Current taskId from params:", taskId);
        console.log("TaskId from URL:", taskId); 
        console.log("Form values:", values);

        if (!taskId) {
            message.error("Task ID is missing!");
            return;
        }

        try {
            if (mode === "create") {

                if (!taskId) {
                    message.error("Task ID is missing!");
                    return;
                }

                await createComment({
                    message: values.message,
                    taskId: taskId,
                }).unwrap();

                message.success("Comment created successfully");
            }

            if (mode === "edit" && comment) {
                await updateComment({
                    id: comment.id,
                    message: values.message,
                }).unwrap();

                message.success("Comment updated successfully");
            }
            form.resetFields();
            navigate(-1);

        } catch (error) {
            message.error("Operation failed");
        }
    };

    return(
        <>
            <Divider/>
                <Title level={2}>{mode === "edit" ? "Edit Comment" : "Create Comment"}</Title>
                <Form
                    form={form}
                    onFinish={onFinish}
                    variant={variant || 'filled'}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    initialValues={{ variant: 'filled' }}
                    >

                    <Form.Item
                        label="CommentMessage"
                        name="message"
                        rules={[
                            { required: true, message: 'Please input!' },
                            { min: 3, message: "Message must be at least 3 characters" },
                            { max: 100, message: "Message must be less than 100 characters" }
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
