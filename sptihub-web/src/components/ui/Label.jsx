import React from 'react'

function Label({
    htmlFor,
    className,
    children,
    ...props
}) {
    return <>
        <label className={className} htmlFor={htmlFor} {...props}>
            {children}
        </label>
    </>
}

export default Label