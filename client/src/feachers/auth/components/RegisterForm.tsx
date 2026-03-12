import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../api/auth.api';
import type { RegisterDto } from '../../../interfaces/auth';

export const RegisterForm: React.FC = () => {
    const [signUp, { isLoading }] = useSignUpMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values: RegisterDto) => {
        try {
            const { ...dataToSend } = values;
            
            await signUp(dataToSend).unwrap();
            
            message.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (err: any) {
            message.error(err?.data?.message || 'Registration failed');
        }
    };

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    { required: true, message: "Please enter your name!" },
                    { min: 2, message: "Name must be at least 2 characters!" }
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder="Your name" />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Invalid email format!' }
                ]}
            >
                <Input prefix={<MailOutlined />} placeholder="example@mail.com" />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: 'Please enter your password!' },
                    { min: 6, message: 'Password must be at least 6 characters!' }
                ]}
                hasFeedback
            >
                <Input.Password prefix={<LockOutlined />} placeholder="At least 6 characters" />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm password!"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Repeat your password" />
            </Form.Item>

            <Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={isLoading} 
                    block
                    size="large"
                >
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    );
}
