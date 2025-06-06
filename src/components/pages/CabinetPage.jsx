import React from 'react';
import {Form, Input, Button, Space, message} from 'antd';
import ApiService from '../../services/ApiService';
import {MessageType, showMessage} from '../../utils/messageUtils.ts';
import {useNavigate} from 'react-router-dom';

function CabinetPage() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleFinish = async (values) => {
        const books = values.books || [];

        if (books.length === 0) {
            showMessage(MessageType.Warning, 'Добавьте хотя бы одну книгу', messageApi);
            return;
        }

        try {
            const result = await ApiService.saveBooks(books);

            console.log("response status: ", result.error)

            if (result.error === 0) {
                showMessage(MessageType.Success, result.message, messageApi);
                form.resetFields();
            } else {
                showMessage(MessageType.Error, result.message, messageApi);
            }
        } catch (error) {
            showMessage(MessageType.Error, 'Ошибка при отправке данных', messageApi);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить ваш аккаунт? Это действие необратимо.");

        if (!confirmDelete)
            return;

        try {
            const result = await ApiService.deleteAccount(); // Замените на ваш метод API
            console.log("response status: ", result.error);

            if (result.error === 0) {
                showMessage(MessageType.Success, 'Аккаунт успешно удалён.', messageApi);
                //navigate('/'); // Перенаправление на главную страницу
                window.location.href = '/';
            } else {
                showMessage(MessageType.Error, result.message, messageApi);
            }
        } catch (error) {
            showMessage(MessageType.Error, 'Ошибка при удалении аккаунта', messageApi);
        }
    };

    return (
        <div style={{maxWidth: 600, margin: '0 auto'}}>
            {contextHolder}
            <h2>Добавить книги</h2>
            <Form
                form={form}
                name="books"
                onFinish={handleFinish}
                autoComplete="off"
                initialValues={{books: [{key: Date.now()}]}}
            >
                <Form.List name="books">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key} align="baseline" style={{display: 'flex', marginBottom: 8}}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'title']}
                                        rules={[{required: true, message: 'Введите название книги'}]}
                                    >
                                        <Input placeholder="Название книги"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'author']}
                                        rules={[{required: true, message: 'Введите автора'}]}
                                    >
                                        <Input placeholder="Автор"/>
                                    </Form.Item>
                                    <Button
                                        type="link"
                                        danger
                                        onClick={() => remove(name)}
                                    >
                                        Удалить
                                    </Button>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                >
                                    Добавить книгу
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Отправить книги
                    </Button>
                </Form.Item>
            </Form>

            {/* Кнопка для удаления аккаунта */}
            <Button type="danger" onClick={handleDeleteAccount} block style={{ marginTop: '16px' }}>
                Удалить аккаунт
            </Button>
        </div>
    );
}

export default CabinetPage;
