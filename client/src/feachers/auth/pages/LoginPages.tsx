import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Input, Button, message, Space } from 'antd';
import { useSignInMutation } from '../api/auth.api';

export const LoginPage = () => {
    const [signIn, { isLoading }] = useSignInMutation();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            await signIn(values).unwrap();
            message.success('Welcome!');
            navigate('/boards');
        } catch(error: any) {
            message.error(error?.data?.message || 'Login error');
        }
    };

    return (
        <Card style={{ maxWidth: 400, margin: '100px auto' }}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>

                <Button type="primary" htmlType="submit" block loading={isLoading}>
                    Login
                </Button>
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Space direction="vertical" size={0}>
                        <Link to="/register">Sign Up</Link>
                    </Space>
                </div>
            </Form>
        </Card>
    );
};
