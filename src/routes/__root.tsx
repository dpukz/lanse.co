import { Outlet, createRootRoute } from '@tanstack/react-router'
import Navbar from './-components/navbar'
import Footer from './-components/footer'

export const Route = createRootRoute({
  component: () => (
    <main className='min-h-screen bg-[#08020c] flex flex-col justify-between'>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  ),
})
