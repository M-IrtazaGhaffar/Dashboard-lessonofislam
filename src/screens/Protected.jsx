import React from 'react'
import Login from './Login';

function Protected({ Component }) {
    let login = true;
  return (
    <>
        {
            login ? <Component /> : <Login />
        }
    </>
  )
}

export default Protected