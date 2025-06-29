import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'
import Navbar from './-components/navbar'
import Footer from './-components/footer'

function RootComponent() {
  const location = useLocation()

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <main className='min-h-screen bg-[#08020c] flex flex-col justify-between'>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
