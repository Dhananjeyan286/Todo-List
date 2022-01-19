import React from 'react'

const Buttons = ({text,color,set_showadd,showadd}) => {

    const change=()=>{
        set_showadd(!showadd)
    }

    return (
        <button style={{backgroundColor:color}} className='btn' onClick={change}>
            {text}
        </button>
    )
}

export default Buttons
