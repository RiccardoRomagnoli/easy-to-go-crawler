import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom'
import { HomeOutlined, RetweetOutlined } from '@ant-design/icons';
import { Typography, Space, Layout, Button, Spin, List, Card, Modal, Carousel } from 'antd';
import LoginForm from '../homepage/LoginForm';


export default function CrawlHistory() {
    const { Title, Text, Link } = Typography;
    const { Content } = Layout;

    const navigate = useNavigate();

    const [isUrlsModalVisible, setIsUrlsModalVisible] = useState(false);
    const [isImgsModalVisible, setIsImgsModalVisible] = useState(false);
    const [urlsModal, setUrlsModal] = useState([]);
    const [imgsModal, setImgsModal] = useState([]);

    const data = [
        {id:1, time:"3 min ago", urls:["www.google.it", "link2"], imgs:["https://easy-to-go-crawler-back-end.herokuapp.com/_images/www.ristorantedellerose.it/eventi-busines1.jpg", "https://easy-to-go-crawler-back-end.herokuapp.com/_images/www.ristorantedellerose.it/eventi-busines2.jpg"], target:"www.target.com"},
        {id:2, time:"5 min ago", urls:["link3", "link4"], imgs:["img3", "img4"], target:"www.target1.com"}
    ]

    return (
        <Spin tip="Loading..." spinning={false}>
            <Content style={{ margin: '24px 16px 0', textAlign: 'center' }}>
                    <Title level={4} style={{margin: '20px'}}>Crawls History</Title>
                    <Space direction="horizontal">
                        <Button onClick={() => navigate("/")} type="primary" shape="round" icon={<HomeOutlined />} size={"large"}>Back Home</Button>
                        <Button onClick={() => {}} type="primary" shape="round" icon={<RetweetOutlined />} size={"large"}>Refresh</Button>
                    </Space>
                    {/* <Space direction='vertical' style={{ display: 'flex', margin: '40px', textAlign: "left"}}>
                        {[{key:"1", time:"3 min ago", urls:["link1", "link2"], imgs:["img1", "img2"], target:"www.target.com"}].map((el,index)=>{
                            return <Crawl key={index} crawl={el}></Crawl>;
                        })}
                    </Space> */}
                    <List
                        style={{marginTop:"50px"}}
                        grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Card title={item.target} key={item.id}>
                                    <Space key={item.id} direction='vertical'>
                                        <Text key={item.id} strong>{item.time}</Text>
                                        <Button key={item.id} type="primary" onClick={() => {setIsImgsModalVisible(true); setImgsModal(item.imgs)}}>Open Images</Button>
                                        <Button key={item.id} type="primary" onClick={() => {setIsUrlsModalVisible(true); setUrlsModal(item.urls)}}>Open Url List</Button>
                                        <Button key={item.id} type="danger" onClick={() => {}}>Delete</Button>
                                    </Space>
                                </Card>
                            </List.Item>
                        )}
                    />
            </Content>
            <Modal
                title="Urls found" 
                visible={isUrlsModalVisible}
                onCancel={() => setIsUrlsModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setIsUrlsModalVisible(false)}>
                        Return
                    </Button>]}
            >
                <Space direction="vertical">
                    {urlsModal.map((url,index)=>{
                        return <Text key={index}>{url}</Text>;
                    })}
                </Space>
            </Modal>
            <Modal
                title="Imgs found" 
                visible={isImgsModalVisible}
                onCancel={() => setIsImgsModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setIsImgsModalVisible(false)}>
                        Return
                    </Button>]}
            >
                <Carousel autoplay>
                    {imgsModal.map((img,index)=>{
                        
                        return <div key={index}><img key={index} src={img}/></div>;
                    })}
                </Carousel>
            </Modal>
        </Spin>
  );
}