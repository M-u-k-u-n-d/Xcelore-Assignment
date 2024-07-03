import React from 'react'
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col min-h-screen min-w-full justify-center items-center'>
      <div>
      <h1 className='text-3xl font-bold text-center'>Welcome to the Home Page</h1>
      <p className='text-center'>Click on the buttons below to navigate to the respective pages</p>
    </div>
        <div className='flex flex-row items-center '>
        <Dropdown>
  <MenuButton onClick={()=>{navigate("/fsignup")}}>Signup</MenuButton>
  <MenuButton onClick={()=>{navigate("/fsignin")}}>Signin</MenuButton>
</Dropdown>
        </div>
    </div>
  )
}
