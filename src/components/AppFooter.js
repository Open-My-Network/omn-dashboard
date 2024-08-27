import React from 'react'
import { CFooter } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSpeedometer, cilStar, cilUser, cilSchool } from '@coreui/icons'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://openmynetwork.com" target="_blank" rel="noopener noreferrer">
          Open My Network
        </a>
        <span className="ms-1">&copy; 2024.</span>
      </div>
      <div className="ms-auto d-flex align-items-center">
        <span className="me-2">Follow Us</span>
        <a href="https://twitter.com/openmynetwork" target="_blank" rel="noopener noreferrer">
          <CIcon icon={cilSpeedometer} className="me-2" />
        </a>
        <a href="https://facebook.com/openmynetwork" target="_blank" rel="noopener noreferrer">
          <CIcon icon={cilStar} className="me-2" />
        </a>
        <a href="https://linkedin.com/company/openmynetwork" target="_blank" rel="noopener noreferrer">
          <CIcon icon={cilUser} className="me-2" />
        </a>
        <a href="https://instagram.com/openmynetwork" target="_blank" rel="noopener noreferrer">
          <CIcon icon={cilSchool} className="me-2" />
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
