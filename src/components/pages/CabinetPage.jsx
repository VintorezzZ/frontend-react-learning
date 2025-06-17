import React, {useState, useEffect} from 'react';
import {Form, Input, Button, message, Row, Col, Typography} from 'antd';
import ApiService from '../../services/ApiService2.ts';
import {MessageType, showMessage} from '../../utils/messageUtils.ts';

function CabinetPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [username, setUsername] = useState('');  // Состояние для имени пользователя
    const [initialUsername, setInitialUsername] = useState(''); // Для хранения начального значения имени
    const [isEditing, setIsEditing] = useState(false); // Состояние для редактирования
    const [loading, setLoading] = useState(false); // Состояние для загрузки при операции
    const {Title} = Typography;

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await ApiService.getUserProfile(); // Получите метод для получения профиля

            let profileUsername = response.data.result.profile.username;

            if (response.data.result.error === 0) {
                showMessage(MessageType.Success, 'Успешно получен профиль', messageApi)
                setUsername(profileUsername);
                setInitialUsername(profileUsername);
            } else {
                showMessage(MessageType.Error, response.statusText, messageApi);
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
            const response = await ApiService.deleteAccount();
            console.log("response status: ", response.status);

            if (response.data.result.error === 0) {
                showMessage(MessageType.Success, 'Аккаунт успешно удалён.', messageApi);
                window.location.href = '/';
            } else {
                showMessage(MessageType.Error, response.statusText, messageApi);
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

            const response = await ApiService.updateUsername(username);

            console.log('res: ', response);

            setLoading(false);
            setIsEditing(false);

            if (response.data.result.error === 0) {
                showMessage(MessageType.Success, 'Имя пользователя успешно обновлено.', messageApi);
                setUsername(username);
                setInitialUsername(username)
            } else {
                showMessage(MessageType.Error, response.statusText, messageApi);
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
