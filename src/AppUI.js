import React, {useEffect, useState} from 'react';
import {Layout, Menu, Button, message} from 'antd';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import MainPage from './components/pages/MainPage';
import CabinetPage from './components/pages/CabinetPage';
import LoginWindow from './components/windows/LoginWindow';
import {MessageType, showMessage} from './utils/messageUtils.ts';
import ApiService from './services/ApiService';

const {Header, Content, Footer} = Layout;

function AppUI() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoginWindowVisible, setIsLoginWindowVisible] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        async function handleSession() {
            let result = await ApiService.checkSession();

            if (result.error == false) {
                setIsAuthorized(true);
                console.log('Authorized state set to true');
                showMessage(MessageType.Success, 'Успешная сессия!', messageApi);
                setIsLoginWindowVisible(false);
            } else {
                console.log('Not authorized:', result.message);
                showMessage(MessageType.Error, result.message, messageApi);
            }
        };

        handleSession();

    }, []);


    const handleLogin = async (credentials) => {
        let result = await ApiService.login(credentials);

        if (result.error == 0) {
            setIsAuthorized(true);
            showMessage(MessageType.Success, 'Успешная авторизация!', messageApi);
            setIsLoginWindowVisible(false);
            window.location.href = '/';
        } else {
            showMessage(MessageType.Error, result.message, messageApi);
        }
    };

    const handleRegister = async (credentials) => {
        console.log('Register data:', credentials);

        let result = await ApiService.register(credentials);

        if (result.error == 0) {
            setIsAuthorized(true);
            showMessage(MessageType.Success, 'Успешная регистрация!', messageApi);
            setIsLoginWindowVisible(false);
        } else {
            showMessage(MessageType.Error, result.message, messageApi);
        }
    };

    const handleLogout = async () => {
        let result = await ApiService.logout();

        if (result.error == 0) {
            setIsAuthorized(false);
            showMessage(MessageType.Success, 'Вы вышли из системы.', messageApi);

            setIsLoginWindowVisible(false);
            window.location.href = '/';
        } else {
            showMessage(MessageType.Error, result.message, messageApi);
        }
    };

    return (
        <Router>
            {contextHolder}
            <Layout style={{minHeight: '100vh'}}>
                {/* Общий Header */}
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/">Главная</Link>
                        </Menu.Item>
                        {isAuthorized && (  // Скрытие кнопки "Личный кабинет", если не авторизован
                            <Menu.Item key="2">
                                <Link to="/profile">Личный кабинет</Link>
                            </Menu.Item>
                        )}
                        <Menu.Item key="3">
                            {isAuthorized ? (
                                <Button type="link" onClick={handleLogout}>Выйти</Button>
                            ) : (
                                <Button type="link" onClick={() => setIsLoginWindowVisible(true)}>Войти</Button>
                            )}
                        </Menu.Item>
                    </Menu>
                </Header>

                {/* Контент */}
                <Content style={{padding: '24px'}}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/profile" element={<CabinetPage/>}/>
                    </Routes>
                </Content>

                {/* Общий Footer */}
                <Footer style={{textAlign: 'center'}}>
                    © 2024 Мой сайт
                </Footer>

                {/* Модальное окно для входа */}
                <LoginWindow
                    visible={isLoginWindowVisible}
                    onClose={() => setIsLoginWindowVisible(false)}
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                />

            </Layout>
        </Router>
    );
}

export default AppUI;