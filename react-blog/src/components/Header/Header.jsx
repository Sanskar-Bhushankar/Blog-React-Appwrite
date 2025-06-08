// import React from 'react'
// import {Container,Logo,Footer,LogoutBtn} from '../index'
// import {Link} from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'


// const Header = () => {
//   const authStatus = useSelector((state) => state.auth.status)
//   const navigate = useNavigate()

//   const navItems =[
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     }, 
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//   },
//   {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//   },
//   {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//   },
//   {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//   },
//   ]
//   return (
//     <header className='py-3 shadow bg-blue-600'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//               <Logo width='70px'/>
//             </Link>
//           </div>
//           <ul className='flex ml-auto'>
//               {
//                 navItems.map((item)=>(
//                   item.active ?(<li key={item.name}>
//                     <button onClick={()=>navigate(item.slug)} 
//                     className='inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'>
//                       {item.name}
//                     </button>
//                   </li>):null
//                 ))
//               }
//               {authStatus && (
//                 <li>
//                   <LogoutBtn />
//                 </li>
//               )}
//           </ul>

//         </nav>
//       </Container>    
//     </header>
//   )
// }

// export default Header

import React from 'react'
import { Container, Logo, Footer, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className="py-4 shadow-md bg-gradient-to-r from-blue-600 to-indigo-600">
      <Container>
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo width="50px" />
            <span className="ml-2 text-white text-xl font-semibold tracking-wide hidden sm:inline-block">
              ReactScribe
            </span>
          </Link>

          <ul className="flex gap-3 sm:gap-5 items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-blue-700 transition-all duration-200 font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
