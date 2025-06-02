import React from 'react';
import { Divider, Flex, Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
};

var myHeaderText = "sosiote";

const PageLayout = () => (
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>{myHeaderText}</Header>
      <button onClick={clickHandler}>Go</button>
      <div>{myHeaderText}</div>
      <Divider />
      <Content style={contentStyle}>Content</Content>
      <Divider />
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>

  </Flex>
);

function clickHandler() {
  fetch("http://localhost:80/phpExample/", {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({ action: 1 })
  }).then(resonse => resonse.text()).then(response => {
    console.log(response);
    console.log("myHeadertext: " + myHeaderText)
    myHeaderText = response;
    console.log("myHeadertext: " + myHeaderText)
  })
}

export default PageLayout;