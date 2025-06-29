import DesktopNavbar from "./desktop-navbar"
import MobileNavbar from "./mobile-navbar"

export default function FrostedNavbar() {
  const navItems = [
    { name: "Product", href: "product" },
    { name: "Blog", href: "blog" },
    { name: "About", href: "about" },
  ]

  return (
    <>
      <DesktopNavbar navItems={navItems} />
      <MobileNavbar navItems={navItems} />
    </>
  )
}