import React from 'react'
import {auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate} from 'react-router-dom'
import '../styles/login.css'
import {FcGoogle} from 'react-icons/fc'

function Login() {

  const navigate = useNavigate()

  const signInWithGoogle = async() => {
    const result = await signInWithPopup(auth, provider);
    console.log(result)
    navigate('/')
  }
  return (
    <div className='container login-container' >
      <h2>Sign In with Google</h2>
      <h4>Why Sign In?</h4>
      <small>By signing in you will be able to see more details about the seller, 
        you can agree or disagree with the seller status and comment your experience with the seller.
      </small>
      <button className='submitBtn' onClick={signInWithGoogle}><FcGoogle />Google Sign In</button>
    </div>
  )
}

export default Login