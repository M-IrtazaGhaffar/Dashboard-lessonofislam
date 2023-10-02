import React from 'react'

function Login() {
  return (
    <div className='login'>
      <form action="">
        <h1>Login as Writer</h1>
        <label htmlFor="email">Email</label>
        <input type="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login