import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import '../styles/navbar.css'



function Navbar() {
    const navigate = useNavigate();

    const [user] = useAuthState(auth)
    
    const signUserOut = async() => {
        await signOut(auth)
        navigate('/')
    }

  return (
    <div className='nav-bar' >
        <img src='/logo.svg' alt='logo'></img>
        <div className='div-links-container' >

            <Link className='div-links' to={'/'} >Home</Link>
            {!user ? (<Link className='div-links' to={'/login'}>Login</Link>) : (<Link className='div-links' to={'/createpost'}>Report Scam</Link>)}
            {user && (
                <div className='user-info'>
                    <img className='profile-pic' src={user ? user.photoURL : ""} alt='profile'/>
                    <div className='user-name' >{user ? user.displayName : ""}</div>
                    <button className='log-btn' onClick={signUserOut} >Log Out</button>
                </div>
            )}
        </div>
        

    </div>
  )
}

export default Navbar