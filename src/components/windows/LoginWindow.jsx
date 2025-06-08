// src/components/LoginModal.js
import React, {useState} from 'react';
import {Modal, Form, Input, Button, message} from 'antd';

function LoginModal({visible, onClose, onLogin, onRegister}) {
    const [form] = Form.useForm();
    const [isRegistering, setIsRegistering] = useState(false);

    const handleFinishLogin = (values) => {
        onLogin(values);
        //form.resetFields();
    };

    const handleFinishRegister = (values) => {
        onRegister(values);
        //form.resetFields();
    };

    const handleRegisterClick = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <>
            <Modal
                title={isRegistering ? "Регистрация" : "Авторизация"}
                open={visible}
                onCancel={onClose}
                footer={null}
            >
                <Form form={form} onFinish={isRegistering ? handleFinishRegister : handleFinishLogin}>
                    <Form.Item
                        name="login"
                        rules={[{required: true, message: 'Пожалуйста, введите ваш логин'}]}
                    >
                        <Input placeholder="Имя пользователя"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Пожалуйста, введите ваш пароль'}]}
                    >
                        <Input.Password placeholder="Пароль"/>
                    </Form.Item>
                    {isRegistering && (
                        <Form.Item
                            name="username"
                            rules={[{required: true, type: 'username', message: 'Пожалуйста, введите корректный username'}]}
                        >
                            <Input placeholder="Username"/>
                        </Form.Item>
                    )}
                    {isRegistering && (
                        <Form.Item
                            name="email"
                            rules={[{required: true, type: 'email', message: 'Пожалуйста, введите корректный email'}]}
                        >
                            <Input placeholder="Email"/>
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isRegistering ? "Зарегистрироваться" : "Войти"}
                        </Button>
                    </Form.Item>
                </Form>

                <Button type="link" onClick={handleRegisterClick}>
                    {!isRegistering ? "Зарегистрироваться" : "Войти"}
                </Button>

            </Modal>
        </>
    );
}

export default LoginModal;
