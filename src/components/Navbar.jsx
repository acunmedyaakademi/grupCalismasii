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
                <form className='form'>
                    <input className='input' type="text" placeholder='Ne aramak istemiştiniz?'/>
                    <button className='search trailer'>Ara</button>
                </form>
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