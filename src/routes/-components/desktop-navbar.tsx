import { Link } from "@tanstack/react-router"

export default function DesktopNavbar({ navItems }: {
    navItems: {
        name: string
        href: string
    }[]
}) {
    return (
        <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 backdrop-blur-md ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-rows-1 grid-cols-3 items-center justify-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-white font-semibold flex items-center space-x-2">
                            <img src="/logo.png" alt="Lanse Logo" className="size-10" />
                        </Link>
                    </div>

                    <div className="flex items-center space-x-8 justify-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-white/80 hover:text-white transition-colors duration-200 text-md font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <button
                        className='purple-glass !bg-[rgba(48,16,80,0.85)] w-auto text-sm font-semibold inline-flex items-center justify-end !rounded-md after:!rounded-md px-3 py-2 text-white shadow-sm hover:opacity-85 transition duration-200 hover:cursor-pointer ml-auto'
                        onClick={(e) => {
                            if (window.location.pathname === "/") {
                                e.preventDefault();
                                const element = document.getElementById('early-access');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }
                        }}
                    >
                        Get Early Access
                    </button>
                </div>
            </div>
        </nav>
    )
}
