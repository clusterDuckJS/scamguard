import React from 'react'
import '../styles/submit.css'
import { useNavigate } from 'react-router-dom'

function Submit() {
  const navigate = useNavigate()
  return (
    <div className='container submit-container'>
      <h1>Thank You!</h1>
      <h4>Your post has been submitted. We will make it live after reviewing the data. 
        Thank you for doing your part in helping other buyers from getting scammed. </h4>
        {/* If you are a victim of online fraud please visit our blog to understand what you can do to get y
        our money back. */}
      <div className="btn-div">
        <a className='home-link' href="/">Home</a>
        <button className='submitBtn-report' onClick={() => navigate('/createpost')} >Report another seller</button>
      </div>
    </div>
  )
}

export default Submit