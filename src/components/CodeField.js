import React from 'react'
import MonacoEditor from 'react-monaco-editor';

export default function CodeField ({value, onChange}) {
    return (
        <MonacoEditor
            width="400"
            height="300"
            language="javascript"
            theme="vs-dark"
            options={{
                selectOnLineNumbers: true
            }}
            value={value}
            onChange={onChange}
        />
    )
}