import React, {useState, useEffect} from 'react';
import {Form, Input, Button, message, Row, Col, Typography} from 'antd';
import ApiService from '../../services/ApiService';
import {MessageType, showMessage} from '../../utils/messageUtils.ts';

function CabinetPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [username, setUsername] = useState('');  // Состояние для имени пользователя
    const [initialUsername, setInitialUsername] = useState(''); // Для хранения начального значения имени
    const [isEditing, setIsEditing] = useState(false); // Состояние для редактирования
    const [loading, setLoading] = useState(false); // Состояние для загрузки при операции
    const {Title} = Typography;

    useEffect(() => {
        // Загрузка текущего имени пользователя с бэкенда
        const fetchUserProfile = async () => {
            const result = await ApiService.getUserProfile(); // Получите метод для получения профиля
            if (result.error === 0) {
                showMessage(MessageType.Success, 'Успешно получен профиль', messageApi)
                setUsername(result.profile.username); // Предполагается, что результат содержит ключ `username`
                setInitialUsername(result.profile.username); // Сохраняем начальное имя
            } else {
                showMessage(MessageType.Error, result.message, messageApi);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить ваш аккаунт? Это действие необратимо.");

        if (!confirmDelete)
            return;

        try {
            setLoading(true);
            const result = await ApiService.deleteAccount(); // Замените на ваш метод API
            console.log("response status: ", result.error);

            if (result.error === 0) {
                showMessage(MessageType.Success, 'Аккаунт успешно удалён.', messageApi);
                window.location.href = '/';
            } else {
                showMessage(MessageType.Error, result.message, messageApi);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            showMessage(MessageType.Error, 'Ошибка при удалении аккаунта', messageApi);
        }
    };

    const handleUpdateUsername = async (values) => {

        try {
            setLoading(true);

            const data = { username: username };
            const result = await ApiService.updateUsername(data);

            setLoading(false);
            setIsEditing(false);

            if (result.error === 0) {
                showMessage(MessageType.Success, 'Имя пользователя успешно обновлено.', messageApi);
                setUsername(username); // Обновите состояние с новым именем
            } else {
                showMessage(MessageType.Error, result.message, messageApi);
            }
        } catch (error) {
            setLoading(false);
            showMessage(MessageType.Error, "Error update username", messageApi);
        }

    };

    // Функция для обработки отмены
    const handleCancelEdit = () => {
        setUsername(initialUsername); // Возвращаем имя пользователя к начальному значению
        setIsEditing(false); // Завершаем режим редактирования
    };


    return (
        <div style={{padding: '20px'}}>
            {contextHolder}
            <Title level={2}>Профиль</Title>
            <div style={{marginBottom: '20px'}}>
                <Row align="middle" gutter={16}>
                    <Col>
                        <span style={{fontWeight: 'bold'}}>Имя пользователя:</span>
                    </Col>
                    <Col>
                        {isEditing ? (
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Обновление состояния при вводе
                            />
                        ) : (
                            <span>{username}</span>
                        )}
                    </Col>
                    <Col>
                        {isEditing ? (
                            <>
                                <Button type="primary" onClick={handleUpdateUsername} loading={loading}
                                        style={{marginRight: '10px'}}>
                                    Сохранить
                                </Button>
                                <Button onClick={handleCancelEdit}>
                                    Отмена
                                </Button>
                            </>
                        ) : (
                            <Button type="link" onClick={() => {
                                setInitialUsername(username); // Сохраняем текущее имя перед редактированием
                                setIsEditing(true);
                            }}>
                                Редактировать
                            </Button>
                        )}
                    </Col>
                </Row>
            </div>
            <Button type="danger" onClick={handleDeleteAccount} loading={loading} style={{marginTop: '20px'}}>
                Удалить аккаунт
            </Button>
        </div>
    );
};

export default CabinetPage;
