import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Layout } from "antd";
import "antd/dist/antd.css";
import reportWebVitals from './utils/reportWebVitals';
import { Typography } from 'antd';

import { 
    Route,
    BrowserRouter as Router, 
    Routes } from 'react-router-dom'

import { store } from './store/index';

import NotFoundPage from "./components/NotFoundPage";
import Homepage from "./features/homepage/Homepage.js";
import CrawlHistory from "./features/crawlhistory/CrawlHistory";

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const { Title } = Typography;

const Routing = () =>{
    return (
        <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/history" element={<CrawlHistory />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )

}

root.render(
    <Provider store={store}>
        <Router>
            <Layout>
                <Layout className="page-container">
                    <Routing/>
                    <Layout.Footer className="footer" >
                        <Title level={4}>Easy to Go - Crawler</Title>
                    </Layout.Footer>   
                </Layout>
            </Layout>
        </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
