import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'
import imagen from '../styles/PerroLanding.png'

export default function LandingPage() {
    return (
        <div className='landing'>
            <img src={imagen} alt="" className='imagen' />
            <div className='divText'>CANIN-PEDIA</div>
            <Link to='/home'><button className='welcomeLanding'><span>INGRESAR</span></button></Link>
        </div>


    )
}