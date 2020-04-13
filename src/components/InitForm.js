import React from 'react';
import {Form, Input, Button, Switch} from 'antd'

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

export default function InitForm({onSubmit}) {

    return (
        <Form
          name="repo-init"
          onFinish={onSubmit}
          initialValues={{branch: 'master', isToInit: true}}
        >
          <Form.Item
            label="Username"
            name="user"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Repository Name"
            name="repoName"
            rules={[{ required: true, message: 'Please input your repository name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Branch"
            name="branch"
            rules={[{ required: true, message: 'Please input your branch!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={'Initialize Repository'}
            name={'isToInit'}
            valuePropName={'checked'}
          >
            <Switch />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    )
}