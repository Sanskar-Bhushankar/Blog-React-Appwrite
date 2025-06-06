import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import authService from '../appwrite/auth'
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)
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
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO{/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ) :null
}

export default App
