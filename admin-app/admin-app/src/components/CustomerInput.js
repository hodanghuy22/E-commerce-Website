import React from 'react'
import { Input } from 'antd';

const CustomerInput = (props) => {
    const {type,label,i_id, i_class, name, val,onChange, onBlur} = props
  return (
    <div class="form-floating mt-3">
        <input 
            type={type} 
            class={`form-control ${i_class}`}
            id={i_id}
            placeholder={label} 
            name={name}
            value={val}
            onChange={onChange}
            onBlur={onBlur}
        />
        <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default CustomerInput