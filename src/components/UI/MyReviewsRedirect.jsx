import React, { Component } from 'react'
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';

export default class MyReviewsRedirect extends Component {
    render() {
        return (
            <div className="site-card-border-less-wrapper">
                <Card title="Welcome to PhotoLink!" bordered={false} style={{ width: 300 }}>
                    <p>Please Sign in or Sign up to access reviews page.</p>
                    <Link to = "/Auth" ><Button>Get Started</Button></Link>
                </Card>
            </div>
        )
    }
}