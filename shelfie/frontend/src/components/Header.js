import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoClose } from "react-icons/io5"
import logo from '../img/shelfieLogo3.png'
import '../styles/Header.css'

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Header() {

    const [active, setActive] = useState(false);

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const showElem = () => {
        setActive(!active)
    }

    return (
        <header>
            <div className='headerContainer'>

                {/* logo and hamburger menu */}


                <NavLink className='logo' to="/"><img src={logo} className='logo' alt='logo' /></NavLink>
                <div className={active ? 'hiddenHamburger' : ' hamburgerMenu'}>
                    <RxHamburgerMenu className='hamburger' onClick={showElem} />
                </div>
                <nav className={active ? 'activeNavbar' : 'navbar'}>
                    <div className="links">
                        <div className="closed">
                            <IoClose className='close' onClick={showElem} />
                        </div>

                        <NavLink to="/" onClick={showElem}>Home</NavLink>
                        <NavLink to="about" onClick={showElem}>About</NavLink>

                        {!user && (<>
                            <NavLink to="login" onClick={showElem}>Login</NavLink>
                            <NavLink to="signup" onClick={showElem}>Sign Up</NavLink>
                        </>
                        )}
                        {user && (
                            <>
                                <NavLink to="bookshelf" onClick={showElem}> My BookShelf</NavLink>
                                <NavLink to="wishlist" onClick={showElem}>My WishList</NavLink>
                                <p onClick={logout}>Logout</p>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}
