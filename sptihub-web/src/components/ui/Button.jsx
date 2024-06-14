import React from 'react'

function Button({
    type,
    className,
    children,
    ...props
}) {
    return <>
        <button type={type} className={className} {...props}>
            {children}
        </button>
    </>
}

export default Button
