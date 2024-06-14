import React from 'react'

function Input({
    id,
    type,
    placeholder,
    className,
    ...props
}) {
    return <input id={id} type={type} placeholder={placeholder} className={ `${className} p-2 my-2`} {...props} required />
}

export default Input
