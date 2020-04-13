import React from 'react'
import {Descriptions, Divider, Button, Input, Form} from 'antd'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export default function Overview({repoName, routes, user, onConfirm}) {

    return (
        <div style={{display: 'grid', gridGap: 10, padding: 10}}>
            <Descriptions bordered title="Your informations">
                <Descriptions.Item label="Repository name">{repoName}</Descriptions.Item>
                <Descriptions.Item label="User">{user}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <div style={{display: 'grid', gridGap: 10}}>
                {
                    routes.map(route => (
                        <div 
                            key={`route-${route.method}-${route.path}`} 
                        >
                            <Descriptions bordered column={2}>
                                <Descriptions.Item label="Method">{route.method}</Descriptions.Item>
                                <Descriptions.Item label="Path">{route.path}</Descriptions.Item>
                                <Descriptions.Item label="Handler" span={2}>
                                <SyntaxHighlighter language="javascript">
                                    {route.handler}
                                </SyntaxHighlighter>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    ))
                }
            </div>
            <Form
                name="repo-init"
                onFinish={onConfirm}
                initialValues={{message: 'Added routes'}}
            >
                <Form.Item name={'message'} label={'Commit message'}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        {'Confirm'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

Overview.defaultProps = {
    routes: []
}