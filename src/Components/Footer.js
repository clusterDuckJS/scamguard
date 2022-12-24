import React from 'react'
import {VscGithub} from 'react-icons/vsc'
import '../styles/footer.css'

function Footer() {
  return (
    <div className='footer'>
      <h5 className='footer-para'>&copy; 2022 </h5>
      <div className='footer-github'>
        <VscGithub/>  
        <h3>clusterDuckJS</h3>
      </div>
      <h5>clusterduckjs@gmail.com</h5>
    </div>
  )
}

export default Footer