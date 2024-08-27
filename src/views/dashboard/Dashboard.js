import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate()

  const getTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('token')
  }

  const setCookie = (name, value, days) => {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    if (match) return match[2]
    return null
  }

  useEffect(() => {
    const tokenFromURL = getTokenFromURL();
    const tokenFromCookie = getCookie('auth_token');

    if (!tokenFromURL) {
      setCookie('auth_token', tokenFromURL, 7); // Set cookie for 7 days
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/dashboard');
    } else if (!tokenFromCookie) {
      window.location.assign('http://site.openmynetwork.com/login-test');
    }
    
    setLoading(false); // Cookie check complete
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      Hello
    </div>
  )
}

export default Dashboard
