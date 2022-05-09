import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom'
import { HomeOutlined, RetweetOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Typography, Space, Layout, Button, Spin, List, Card, Modal, Carousel, Image } from 'antd';
import { selectCrawls, getCrawl, selectLoading, deleteCrawl } from './crawlHistorySlice';
import "./index.css";
import timeDifference from "../../utils/timeDifference";


export default function CrawlHistory() {
    const { Title, Text, Link } = Typography;
    const { Content } = Layout;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isUrlsModalVisible, setIsUrlsModalVisible] = useState(false);
    const [isImgsModalVisible, setIsImgsModalVisible] = useState(false);
    const [urlsModal, setUrlsModal] = useState([]);
    const [imgsModal, setImgsModal] = useState([]);

    const crawls = useSelector(selectCrawls);
    const loading = useSelector(selectLoading);
    
    return (
        <Spin tip="Loading..." spinning={loading}>
            <Content style={{ margin: '24px 16px 0', textAlign: 'center' }}>
                    <Title level={4} style={{margin: '20px'}}>Crawls History</Title>
                    <Space direction="horizontal">
                        <Button onClick={() => navigate("/")} type="primary" shape="round" icon={<HomeOutlined />} size={"large"}>Back Home</Button>
                        <Button onClick={() => dispatch(getCrawl())} type="primary" shape="round" icon={<RetweetOutlined />} size={"large"}>Refresh</Button>
                    </Space>
                    <List
                        style={{marginTop:"50px"}}
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 3,
                        }}
                        dataSource={crawls}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Card title={item.target} key={item.id}>
                                    <Space key={item.id} direction='vertical'>
                                        <Text key={item.id} strong>{item.finishDate != null ? timeDifference(new Date().getTime(), new Date(item.finishDate).getTime()) : "In progress" }</Text>
                                        <Button key={item.id} type="primary" onClick={() => {setIsImgsModalVisible(true); setImgsModal(item.imgs)}}>Open Images</Button>
                                        <Button key={item.id} type="primary" onClick={() => {setIsUrlsModalVisible(true); setUrlsModal(item.urls)}}>Open Url List</Button>
                                        <Button key={item.id} type="danger" onClick={() => dispatch(deleteCrawl({id: item.id}))}>Delete</Button>
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
                        return <Text>{url}</Text>;
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
                <Carousel autoplay arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
                    {imgsModal.map((img,index)=>{
                        return <Image src={img} style={{maxWidth:"200px", maxHeight:"200px"}}/>;
                    })}
                </Carousel>
            </Modal>
        </Spin>
  );
}