import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../reducers/Reducers";

function Login() {

  const n = useNavigate()
  const dispatch = useDispatch()

  const [Data, setData] = useState({
    email: '',
    password: ''
  })

  const [Loading, setLoading] = useState(0)

  const handleInput = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }

  const loginForm = async (e) => {
    setLoading(1)
    e.preventDefault()
    try {
      const res = await axios.post('https://api-lessonofislam.ittidevelops.com/writer/login', Data)
      if (res.status === 200) {
        let uid = await res.data.data;
        let token = await res.data.token;
        dispatch(login({ uid, token }))
        n('/dashboard/')
      }
    } catch (error) {
      if (error.response.status === 401) alert(error.response.data.message)
      else alert('Some Error Occured')
    }
    setLoading(0)
  }

  return (
    <div className='login'>
      <form onSubmit={loginForm}>
        <h1>Login as Writer</h1>
        <label htmlFor="email">Email</label>
        <input type="email" name='email' onChange={handleInput} required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleInput} required />
        <button type='submit'>
          {
            Loading ? 'Please Wait...' : 'Login'
          }
        </button>
      </form>
    </div>
  )
}

export default Login