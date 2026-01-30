import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
        <h1>404 No Page Found</h1>
        <Link to="/">Go to Home</Link>
    </div>
  )
}

export default NotFound