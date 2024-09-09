import React from 'react'
import { CAvatar } from '@coreui/react'

const ProfileCard = () => {
  return (
    <div className="card">
      <div className="card-body p-5">
        <div className="row">
          <div className="col-lg-8">
            <p className="h3 mb-4">Abishek Khanal</p>
            <p className="">abishekkhanal2056@gmail.com</p>
          </div>
          <div className='col-lg-4'>
            <CAvatar src="https://via.placeholder.com/400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
