import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./btn"
import { Link } from "@tanstack/react-router"

export default function MobileNavbar({ navItems }: {
    navItems: {
        name: string
        href: string
    }[]
}) {
    const [isOpen, setIsOpen] = useState(false)

    const MotionHash = motion.a;


    function toggleNav() {
        setIsOpen(!isOpen)
        if (!isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }

    const iconVariants = {
        opened: {
            rotate: 135,
        },
        closed: {
            rotate: 0,
        },
    }

    const menuVariants = {
        opened: {
            top: 0,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.15,
            },
        },
        closed: {
            top: "-100vh",
        },
    }

    const linkVariants = {
        opened: {
            opacity: 1,
            y: 50,
        },
        closed: {
            opacity: 0,
            y: 0,
        },
    }

    return (
        <>
            <header className="md:hidden sticky top-0 z-50 flex w-full flex-row items-center justify-between backdrop-blur-md border-b border-white/20 px-4 py-3">
                <MotionHash href="/#" className="flex items-center space-x-2 text-white" onClick={() => (isOpen ? toggleNav() : null)}>
                    <img src="/logo.png" alt="Lanse Logo" className="size-8" />
                </MotionHash>

                <motion.div
                    variants={iconVariants}
                    animate={isOpen ? "opened" : "closed"}
                    onClick={() => toggleNav()}
                    className="z-50 flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-white/5 transition-colors"
                >
                    <motion.div
                        initial={false}
                        animate={isOpen ? "opened" : "closed"}
                        style={{ width: 24, height: 24, position: "relative" }}
                    >
                        <motion.span
                            style={{
                                position: "absolute",
                                left: 0,
                                width: 24,
                                height: 3,
                                borderRadius: 2,
                                background: "white",
                                display: "block",
                            }}
                            animate={isOpen ? { rotate: 90, top: 10.5, left: 0 } : { rotate: 0, top: 4, left: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <motion.span
                            style={{
                                position: "absolute",
                                left: 0,
                                width: 24,
                                height: 3,
                                borderRadius: 2,
                                background: "white",
                                display: "block",
                            }}
                            animate={isOpen ? { opacity: 1, rotate: 0, top: 10.5, left: 0 } : { opacity: 1, rotate: 0, top: 10.5, left: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <motion.span
                            style={{
                                position: "absolute",
                                left: 0,
                                width: 24,
                                height: 3,
                                borderRadius: 2,
                                background: "white",
                                display: "block",
                            }}
                            animate={isOpen ? { rotate: 0, top: 10.5, left: 0 } : { rotate: 0, top: 17, left: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    </motion.div>
                </motion.div>
            </header>

            <motion.nav
                className="fixed top-0 z-40 flex h-full w-full flex-col items-center justify-center bg-white/5 backdrop-blur-lg backdrop-filter md:hidden"
                initial={false}
                variants={menuVariants}
                animate={isOpen ? "opened" : "closed"}
            >
                <motion.div className="fixed top-[30vh] flex list-none flex-col items-center justify-center gap-y-6 text-xl font-medium text-white">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.name}
                            onClick={() => toggleNav()}
                            variants={linkVariants}
                        >
                            <Link to={item.href} className="hover:text-purple-300 transition-colors">
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}

                    <motion.div
                        variants={linkVariants}
                        onClick={async () => {
                            toggleNav();
                            if (window.location.pathname !== "/") {
                                window.location.href = "/#early-access";
                            } else {
                                const element = document.getElementById('early-access');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }
                        }}
                        className="cursor-pointer mt-8"
                    >
                        <Button className='purple-glass text-sm font-semibold inline-flex items-center justify-center !rounded-md after:!rounded-md px-3 py-2 text-white shadow-sm hover:opacity-85 transition duration-200 hover:cursor-pointer'>Get Early Access</Button>
                    </motion.div>
                </motion.div>
            </motion.nav>
        </>
    )
}
