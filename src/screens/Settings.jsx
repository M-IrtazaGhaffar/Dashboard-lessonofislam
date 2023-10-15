import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import { logout } from '../reducers/Reducers';

function Settings() {
  const dispatch = useDispatch()
  const { uid, token } = useSelector(state => state.auth)
  const [Data, setData] = useState({
    Name: '',
    Email: '',
    Date: ''
  })
  const [Error, setError] = useState(0)
  const [Loading, setLoading] = useState(0)

  const fetchData = async () => {
    setLoading(1)
    try {
      const res = await axios.post('https://api-lessonofislam.ittidevelops.com/writer/fetchUser', {
        token: token,
        id: uid
      })
      const d = await res.data.data
      setData({ ...d })
    } catch (error) {
      console.log('Some Error ');
      setError(1)
      let err = error.response.status || 500
      if (err === 401) {
        alert(error.response.data.message)
        dispatch(logout())
      }
      else alert('Some Error Occured')
    }
    setLoading(0)
  }
  useEffect(() => {
    fetchData()
  }, [])


  return (
    Error
      ?
      <p className='error'>Some Error Occured</p>
      :
      Loading
        ?
        <Loader />
        :
        <div className='settings'>
          <div className='route'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-nested" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z" />
            </svg>
            <h3>Settings</h3>
          </div>
          <div className='data'>
            <label htmlFor="name">Your Name</label>
            <input type="text" disabled value={Data.Name} />
            <br />
            <label htmlFor="email">Registered Email</label>
            <input type="text" disabled value={Data.Email} />
            <br />
            <label htmlFor="date">Date Joined</label>
            <input type="text" disabled value={Data.Date.split('T')[0]} />
          </div>
          <form>
            <h3>
              Change Password
            </h3>
            <p>
              (Click on the given button to change password)
            </p>
            <button>Change Password</button>
          </form>
        </div>
  )
}

export default Settings