import React from 'react'

const Error_message = ({content,set_error_msg}) => {

    const ondismiss=()=>{
        set_error_msg("")
    }

    return (
        <div className='alert alert-danger' onDismiss={ondismiss}>
            {content}
        </div>
    )
}

export default Error_message
