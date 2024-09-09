import React from 'react'

const ProfileTabBar = () => {
  return (
    <ul class="nav nav-underline p-4">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">
          Profile
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          Connections
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          Photos
        </a>
      </li>
    </ul>
  )
}

export default ProfileTabBar
