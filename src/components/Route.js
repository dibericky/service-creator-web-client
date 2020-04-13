import React, {useCallback} from 'react'
import {Input, Form, Card, Select} from 'antd'
import CodeField from './CodeField'

const {Option} = Select

const DEFAULT_HANDLER_VALUE = `function (request, reply) {
    reply.send({})
}
`
const DEFAULT_PATH = '/'

export default function Route({onChange, value={}}) {

    const onChangeValue = useCallback((fieldValue, fieldName) => {
        const newValues = {
            ...value,
            [fieldName]: fieldValue
        }
        onChange({
            ...newValues,
            ...!newValues.handler ? {handler: DEFAULT_HANDLER_VALUE} : {},
            ...!newValues.path ? {path: DEFAULT_PATH} : {},
        })
    }, [onChange, value])

    return (
        <Card>
            <Form.Item 
                label={'Method'}
            >
                <Select 
                    value={value.method} 
                    style={{ width: 120 }} 
                    onChange={method => onChangeValue(method, 'method')}
                    >
                    <Option value="post">POST</Option>
                    <Option value="get">GET</Option>
                </Select>
            </Form.Item>
            <Form.Item 
                label={'Path'}
            >
                <Input 
                    value={value.path || DEFAULT_PATH} 
                    onChange={e => onChangeValue(e.target.value, 'path')} 
                />
            </Form.Item>
            <Form.Item 
                label={'handler'}
            >
                <CodeField 
                    value={value.handler || DEFAULT_HANDLER_VALUE} 
                    onChange={code => onChangeValue(code, 'handler')}
                />
            </Form.Item>
        </Card>
    )
}
