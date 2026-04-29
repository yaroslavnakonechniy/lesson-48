import React from 'react';
import { Card, Typography, Space } from 'antd';
import { RegisterForm } from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export const RegisterPage: React.FC = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            backgroundColor: '#f0f2f5' 
        }}>
            <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Space orientation="vertical" size="middle" style={{ width: '100%', textAlign: 'center' }}>
                    <Title level={2} style={{ marginBottom: 0 }}>Create an account</Title>
                    <Text type="secondary">Fill out the registration form</Text>
                    
                    <RegisterForm />
                    
                    <Text>
                        Already have an account? <Link to="/login">Log in</Link>
                    </Text>
                </Space>
            </Card>
        </div>
    );
}
