import React from "react";
import NormalLoginForm from "./components/NormalLoginForm";
import { Row, Col } from 'antd';

function Login()
{
    return (
        <div>
            <Row style={{minHeight: '100vh'}} justify="center" align="middle">
                <Col span={6}><NormalLoginForm /></Col>
            </Row>
        </div>
    )
}

export default Login;