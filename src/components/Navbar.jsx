import React from 'react'
import '../style/navbar.css'
import moviesLogo from '../assets/appleTvPlusLogo.png'

function Navbar() {
    return (
        <>
            <div className='containerBar'>
                <div className='logo'>
                    <img src={moviesLogo} alt="" />
                </div>
    
                <div>
                    <ul className='navbar'>
                        <li> <a href="#">Anasayfa</a> </li>
                        <li> <a href="#">Filmler</a> </li>
                        <li> <a href="#">Diziler</a> </li>
                    </ul>
                </div>
                
            </div>


        </>
    )
}

export default Navbar