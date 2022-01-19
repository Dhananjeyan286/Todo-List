import React from 'react'
import Buttons from './Buttons'
import {useLocation} from "react-router-dom"

const Header = ({title,showadd,set_showadd}) => {

    const location=useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname==="/" && <Buttons text={showadd?"close":"add"} color={showadd?"red":"green"} set_showadd={set_showadd} showadd={showadd}/>}
        </header>
    )
}

export default Header
