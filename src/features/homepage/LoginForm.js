import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Col, Row, Input  } from 'antd';
import { login } from './homepageSlice';

export default function LoginForm({closeDrawer}){
    const dispatch = useDispatch();

    const onFinish = ({username, password})=> {
        dispatch(login({username, password}))
        closeDrawer()
    }

    return (
        <>
            <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please enter an unique username' }]}>
                            <Input placeholder="Please enter an unique username" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Choose your password' }]}>
                            <Input placeholder="Choose your password" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} align="middle" justify='center' style={{marginTop: "15px"}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: "200px"}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
      </>
    );
}