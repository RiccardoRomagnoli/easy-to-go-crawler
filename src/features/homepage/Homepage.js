import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive'
import { useNavigate  } from 'react-router-dom'
import { Typography, Space, Layout, Button, Input, Divider, Drawer, Spin } from 'antd';
import { LoginOutlined, EditOutlined, LogoutOutlined, HistoryOutlined } from '@ant-design/icons';
import SingupForm from './SingupForm.js';
import LoginForm from './LoginForm.js';
import {
    logout,
    scan,
    selectLoading,
    selectIsLogged,
  } from './homepageSlice';


export default function Homepage() {
    const { Title } = Typography;
    const { Content } = Layout;
    const { Search } = Input;

    const loading = useSelector(selectLoading);
    const isLogged = useSelector(selectIsLogged);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const isMobile = useMediaQuery({ query: '(max-width: 780px)' })
    const [singupFormVisible, setSingupFormVisible] = useState(false);
    const [loginFormVisible, setLoginFormVisible] = useState(false);

    return (
        <>
            <Spin tip="Loading..." spinning={loading}>
            <Content style={{ margin: '24px 16px 0', textAlign: 'center' }}>
                <Title level={4} style={{margin: '50px'}}>Authenticate yourself to enable the Crawler App</Title>
                <Space direction="horizontal" style={{margin: '0 0 20px 0'}}>
                    <Button hidden={!isLogged} onClick={() => setLoginFormVisible(true)} type="primary" shape="round" icon={<LoginOutlined />} size={"large"}>Login</Button>
                    <Button hidden={!isLogged} onClick={() => setSingupFormVisible(true)} type="primary" shape="round" icon={<EditOutlined />} size={"large"}>Sing-up</Button>
                    <Button hidden={isLogged} onClick={() => dispatch(logout())} danger shape="round" icon={<LogoutOutlined />} size={"large"}>Logout</Button>
                </Space>
                <Space direction="vertical" style={{ display: 'flex'}}>
                    <Divider>Crawler</Divider>
                    <Search disabled={isLogged} placeholder="https://www.mysite.com/" enterButton="Start Crawl" size="large" onSearch={target => dispatch(scan({target}))}/>
                </Space>
                <Space style={{margin: '20px 0px 0px 0'}}>
                    <Button disabled={isLogged} onClick={() => navigate("/history")} type="primary" shape="round" icon={<HistoryOutlined />} size={"large"}>Check Past Crawls</Button>
                </Space>
            </Content>

            {/* Singup form */}
            <Drawer
                title="Create a new account"
                placement="right"
                width={!isMobile ? 720 : ""}
                onClose={() => setSingupFormVisible(false)}
                visible={singupFormVisible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                    <Button onClick={() => setSingupFormVisible(false)}>Cancel</Button>
                    </Space>
            }
            >
                <SingupForm closeDrawer={() => setSingupFormVisible(false)} />
            </Drawer>

            {/* Login form */}
            <Drawer
                title="Log in to your account"
                placement="right"
                width={!isMobile ? 720 : ""}
                onClose={() => setLoginFormVisible(false)}
                visible={loginFormVisible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                    <Button onClick={() => setLoginFormVisible(false)}>Cancel</Button>
                    </Space>
            }
            >
                <LoginForm closeDrawer={() => setLoginFormVisible(false)} />
            </Drawer>
            </Spin>
        </>
    );
}
