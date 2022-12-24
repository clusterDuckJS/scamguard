import React from 'react'
import {VscGithub} from 'react-icons/vsc'
import '../styles/footer.css'

function Footer() {
  return (
    <div className='footer'>
      <small className='footer-para'>&copy; 2022 </small>
      <div className='footer-github'>
        <VscGithub/>  
        <small>clusterDuckJS</small>
      </div>
      <small>clusterduckjs@gmail.com</small>
    </div>
  )
}

export default Footer