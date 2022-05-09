import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Col, Row, Input } from 'antd';
import { singup } from './homepageSlice';

export default function SingupForm({closeDrawer}){
    const dispatch = useDispatch();

    const onFinish = ({username, password, firstName, lastName}) => {
        dispatch(singup({username, password, firstName, lastName}))
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
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[{ required: true, message: 'Please enter your first name' }]}>
                            <Input placeholder="Please enter your first name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please enter your last name' }]}>
                            <Input placeholder="Please enter your last name" />
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