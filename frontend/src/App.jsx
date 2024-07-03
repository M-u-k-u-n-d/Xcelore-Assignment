

import './App.css';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Admin = lazy(() => import('./pages/Admin'));
const User = lazy(() => import('./pages/User'));
const Update = lazy(() => import('./pages/Update'));
const Create = lazy(() => import('./pages/Create'));
import Loading from './assets/Loading';
export default function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
      <BrowserRouter>
      
      <Routes>
      <Route path="/" element={<Suspense fallback={<Loading/>}><Home/></Suspense>} />
      <Route path="/fsignup" element={<Suspense fallback={<Loading/>}><Signup/></Suspense>} />
      <Route path="/fsignin" element={<Suspense fallback={<Loading/>}><Signin/></Suspense>} />
      <Route path="/fuser" element={<Suspense fallback={<Loading/>}><User/></Suspense>}/>
      <Route path="/fadmin" element={<Suspense fallback={<Loading/>}><Admin/></Suspense>}/>
      <Route path='/fupdate' element={<Suspense fallback={<Loading/>}><Update/></Suspense>}/>
      <Route path='/fcreate' element={<Suspense fallback={<Loading/>}><Create/></Suspense>}/>
      </Routes>
    </BrowserRouter>
        </div>
    </>
  )

    

}


