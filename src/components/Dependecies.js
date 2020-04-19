import React, { useState } from 'react'
import {List, Input, Button, Form, AutoComplete} from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import npmSearch from 'libnpmsearch'

const { useForm } = Form

export default function Dependencies({onAdd, onRemove, dependencies=[]}) {
    return (
        <>
            <AddDependency
                onAdd={onAdd}
                existingDependencies={dependencies.map(item => item.name)}
            />
            <List 
                dataSource={dependencies}
                itemLayout={'vertical'}
                renderItem={item => (
                    <List.Item>
                        <div 
                            style={{
                                display: 'grid', 
                                gridGap: 10, 
                                alignItems: 'center', 
                                gridTemplateColumns: 'repeat(3, min-content)'
                            }}
                        >
                            <Button 
                                type="danger" 
                                shape="circle" 
                                size={'small'}
                                icon={<MinusOutlined />}
                                onClick={() => onRemove(item.name)}
                            />
                            <span style={{fontWeight: 'bold'}}>{item.name}</span>
                            <span>{item.version}</span>
                        </div>
                    </List.Item>
                )}
            />
        </>
    )
}


function AddDependency({onAdd, existingDependencies=[]}) {
    const [form] = useForm()
    const [npmResults, setNpmResults] = useState([])
    return (
        <Form
          name="form-add-dependency"
          onFinish={values => {
            onAdd(values)
            form.resetFields()
          }}
          form={form}
          onValuesChange={values => {
              if(values.name) {
                  const moduleChosen = npmResults.find(item => item.name === values.name)
                  form.setFieldsValue({
                      version: moduleChosen ? moduleChosen.version : undefined
                  })
              }
          }}
        >
            <Form.Item 
                name={'name'} 
                label={'Name'}
                rules={[{
                    required: true
                }, 
                () => ({
                    validator(rule, value) {
                      if (!value || !existingDependencies.includes(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject('This dependency has already been added');
                    }
                })
                ]}
            >
                <AutoComplete 
                    options={npmResults.map(item => ({value: item.name, label: `${item.name} - ${item.version}`}))}
                    placeholder={'module name'} 
                    onSearch={value => {
                        npmSearch(value, {limit: 10})
                             .then(results => {
                                 const modules = results.map(item => ({name: item.name, version: item.version}))
                                 setNpmResults(modules)
                             })
                             .catch(() => {
                                 setNpmResults([])
                             })
                    }}
                />
            </Form.Item>
            <Form.Item 
                name={'version'} 
                label={'Version'}
                rules={[{
                    required: true
                }]}
            >
                <Input placeholder={'module version'} />
            </Form.Item>
            <Form.Item>
                <Button htmlType={'submit'} icon={<PlusOutlined />}>{'Add'}</Button>
            </Form.Item>    
        </Form>
    )
}