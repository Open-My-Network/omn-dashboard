import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilStar, cilUser, cilSchool, cilNewspaper } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Members',
    to: '/members',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Schools',
    to: '/schools',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },{
    component: CNavItem,
    name: 'Post',
    to: '/posts',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Development Plan',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List all Plans',
        to: '/development-plan',
        // badge: {
        //   color: 'success',
        // text: 'New
        // },
      },
      {
        component: CNavItem,
        name: 'Verification Request',
        to: '/development-plan/verification',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
    ],
  },
]

export default _nav
