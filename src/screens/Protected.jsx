import React from 'react'
import Login from './Login';
import { useSelector } from 'react-redux';

function Protected({ Component }) {
  const { uid, token } = useSelector(state => state.auth)
  var Auth = false;

  if (uid !== 0 && token !== '') {
    Auth = true
  }

  return (
    <>
      {
        Auth ? <Component /> : <Login />
      }
    </>
  )
}

export default Protected