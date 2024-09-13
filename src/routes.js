import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Customs
const Members = React.lazy(() => import('./views/members/Members'))
const Schools = React.lazy(() => import('./views/schools/pages/SchoolPage'))
const TransferPoints = React.lazy(() => import('./views/points/pages/TransferPoints'))
const DevPlan = React.lazy(() => import('./views/development_plan/pages/DevPlan'))
const DevPlanVerification = React.lazy(() => import('./views/development_plan/pages/DevRequest'))
const PostPage = React.lazy(() => import('./views/post/pages/PostPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/members', name: 'Members', element: Members },
  { path: '/schools', name: 'Schools', element: Schools },
  { path: '/posts', name: 'Posts', element: PostPage },
  { path: '/transfer-points', name: 'Points', element: TransferPoints },
  { path: '/development-plan', exact: true, name: 'Development Plan', element: DevPlan },
  {
    path: '/development-plan/verification',
    name: 'Development Plan Verification',
    element: DevPlanVerification,
  },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
