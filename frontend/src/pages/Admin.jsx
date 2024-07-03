import React from 'react'
import Button from '@mui/joy/Button';
import GetUsers from '../components/GetUsers'
import { useNavigate } from 'react-router-dom'
export default function Admin() {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center min-h-screen min-w-full space-x-2 space-y-4'>
      <h1 className='text-4xl font-bold'> Welcome to the admin panel !!</h1>
      <div className='flex flex-col  items-center space-y-14'>
        <div className='flex items-center justify-center '>
        <GetUsers/>
        </div>
        <div className='flex '>
          <Button onClick={()=>{navigate('/fcreate')}}>Create new  User</Button>
        </div>
        </div>
    </div>
  )
}
