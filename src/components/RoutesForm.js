import React from 'react'
import {Form, Button} from 'antd'
import {PlusOutlined} from "@ant-design/icons"
import Route from './Route'

export default function RoutesForm({onSubmit}) {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <Form name="routes-form" onFinish={onSubmit}>
                    <Form.List 
                    name={'routes'}
                    >
                        {(fields, {add}) => (
                            <div>
                            {fields.map(field => {
                                return (
                                    <Form.Item {...field}>
                                    <Route  />
                                    </Form.Item>
                                )
                                
                            })}
                            <Form.Item>
                            <Button
                            type="dashed"
                            onClick={() => add()}
                            >
                            <PlusOutlined /> Add field
                            </Button>
                        </Form.Item>
                            </div>
                        )}
                    </Form.List>
                <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}