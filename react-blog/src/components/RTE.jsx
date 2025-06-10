import React from 'react'
import MDEditor from '@uiw/react-md-editor';
import MarkdownIt from 'markdown-it';
import '@uiw/react-md-editor/markdown-editor.css'; // Correct import
import '@uiw/react-markdown-preview/markdown.css'; // Correct import for preview styles
import {Controller } from 'react-hook-form';

const mdParser = new MarkdownIt();

export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange, value}}) => (
        <MDEditor
            value={value}
            onChange={(val) => onChange(val || '')}
            height={500}
            data-color-mode="light" // Ensure light mode for consistency with prose
        />
    )}
    />

     </div>
  )
}
