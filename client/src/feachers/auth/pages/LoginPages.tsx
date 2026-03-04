import { Card, Form, Input, Button } from 'antd';
import { useSignInMutation } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await signIn(values).unwrap();
      navigate('/boards');
    } catch {
      console.log('Login failed');
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
      </Form>
    </Card>
  );
};
