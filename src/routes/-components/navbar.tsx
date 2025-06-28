import DesktopNavbar from "./desktop-navbar"
import MobileNavbar from "./mobile-navbar"

export default function FrostedNavbar() {
  const navItems = [
    { name: "About", href: "about" },
    { name: "Blog", href: "blog" },
  ]

  return (
    <>
      <DesktopNavbar navItems={navItems} />
      <MobileNavbar navItems={navItems} />
    </>
  )
}