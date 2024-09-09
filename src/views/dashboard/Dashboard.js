import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ProfileCard from './widgets/ProfileCard'
import ProfileTabBar from './widgets/ProfileTabBar'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Function to extract the token from URL
  // const getTokenFromURL = () => {
  //   const urlParams = new URLSearchParams(window.location.search)
  //   return urlParams.get('token') // Assuming the token is passed as ?token=...
  // }

  // // Function to set cookies
  // const setCookie = (name, value, days) => {
  //   let expires = ''
  //   if (days) {
  //     const date = new Date()
  //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  //     expires = '; expires=' + date.toUTCString()
  //   }
  //   document.cookie = name + '=' + (value || '') + expires + '; path=/'
  // }

  // // Function to get cookies
  // const getCookie = (name) => {
  //   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  //   if (match) return match[2]
  //   return null
  // }

  // // Function to validate nonce (or token)
  // const validateToken = async (token) => {
  //   try {
  //     const response = await fetch('http://site.openmynetwork.com/wp-json/myapi/validate_nonce', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ nonce: token }),
  //     })
  //     const data = await response.json()
  //     return data.valid // Assuming the response contains a `valid` key indicating the result
  //   } catch (error) {
  //     console.error('Token validation failed:', error)
  //     return false
  //   }
  // }

  // useEffect(() => {
  //   const tokenFromURL = getTokenFromURL()
  //   const tokenFromCookie = getCookie('auth_token')

  //   // Check if token exists in URL
  //   if (tokenFromURL) {
  //     // Validate the token (nonce) with the backend
  //     validateToken(tokenFromURL).then((isValid) => {
  //       if (isValid) {
  //         // Set token in cookie and remove it from URL
  //         setCookie('auth_token', tokenFromURL, 7)
  //         window.history.replaceState({}, document.title, window.location.pathname)
  //         setLoading(false)
  //         // Optional: If you want to ensure the same page is rendered after setting the token
  //         navigate('/dashboard')
  //       } else {
  //         // Redirect to login if the token is invalid
  //         window.location.assign('http://site.openmynetwork.com/login-test')
  //       }
  //     })
  //   } else if (tokenFromCookie) {
  //     // If no token in URL but cookie exists, no need to redirect
  //     setLoading(false)
  //   } else {
  //     // Redirect to login if no token or cookie is found
  //     window.location.assign('http://site.openmynetwork.com/login-test')
  //   }
  // }, [navigate])

  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <div className="spinner-border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <ProfileCard />
      <ProfileTabBar />
    </div>
  )
}

export default Dashboard
