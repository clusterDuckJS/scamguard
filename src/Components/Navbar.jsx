import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import '../styles/navbar.css'
// import {CiLogout} from 'react-icons/ci'



function Navbar() {
    const navigate = useNavigate();

    const [user] = useAuthState(auth)
    
    const signUserOut = async() => {
        await signOut(auth)
        navigate('/')
    }

  return (
    <div className= 'container-navbar' >
        <Link to={'/'}>
        <img className='logo-img' src='/images/logo.svg' alt='logo'></img>
        </Link>
        
        <div className='links-container' >
            {!user ? (<Link className='div-links' to={'/login'}>Login</Link>) : (<Link className='div-links' to={'/createpost'}>Report Scam</Link>)}
            {user && (
                <div className='user-info'>
                    <img className='profile-pic' src={user ? user.photoURL : ""} alt='profile'/>
                    <h4 className='user-name' >{user ? user.displayName : ""}</h4>
                     <button className='log-btn' onClick={signUserOut} >Log Out</button> 
                    {/* <a href="#" onClick={signUserOut}> Log Out</a> */}
                </div>
                
            )}
        </div>
        

    </div>
  )
}

export default Navbar