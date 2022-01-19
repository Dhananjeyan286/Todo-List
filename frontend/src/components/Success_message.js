import React from 'react'

const Success_message = ({content,set_success_msg}) => {

    const ondismiss=()=>{
        set_success_msg("")
    }

    return (
        <div className='alert alert-success' onDismiss={ondismiss}>
            {content}
        </div>
    )
}

export default Success_message
