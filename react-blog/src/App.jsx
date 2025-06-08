import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from '../appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }) //will apply catch if any error occurs in future at runtime
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-white text-gray-900'>
      <Header/>
      <main className='flex-grow py-6'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  ) :null
}

export default App
