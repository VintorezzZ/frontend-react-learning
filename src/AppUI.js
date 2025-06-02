import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MainPage from './components/MainPage';
import CabinetPage from './components/CabinetPage';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Общий Header */}
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Главная</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/profile">Личный кабинет</Link>
            </Menu.Item>
          </Menu>
        </Header>

        {/* Контент */}
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<CabinetPage />} />
          </Routes>
        </Content>

        {/* Общий Footer */}
        <Footer style={{ textAlign: 'center' }}>
          © 2024 Мой сайт
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;