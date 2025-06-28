import { Link } from "@tanstack/react-router"

export default function DesktopNavbar({ navItems }: {
    navItems: {
        name: string
        href: string
    }[]
}) {
    return (
        <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-white font-semibold flex items-center space-x-2">
                        lanse.ai
                    </Link>

                    <div className="flex items-center space-x-8">
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

                    <Link
                        to="/#early-access"
                        className='glass text-sm font-semibold inline-flex items-center justify-center !rounded-md after:!rounded-md px-3 py-2 text-white shadow-sm hover:opacity-85 transition duration-200 hover:cursor-pointer'
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
                    </Link>
                </div>
            </div>
        </nav>
    )
}
