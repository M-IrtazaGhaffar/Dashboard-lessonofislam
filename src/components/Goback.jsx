import React from 'react'
import { useNavigate } from 'react-router-dom'

function Goback() {
    const n = useNavigate()
    return (
        <div onClick={()=>n(-1)} className='goback'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
            Goback
        </div>
    )
}

export default Goback