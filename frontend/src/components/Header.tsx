import Link from "next/link"
import { useEffect, useState } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  
  return (
    <header className={`${isScrolled && 'bg-white/90' || 'bg-white'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <img 
            src="/Logo.png" 
            alt="The tactalyse logo"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink"><Link href="/">Home</Link></li>
          <li className="headerLink"><Link href="/order">Order</Link></li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink"><Link href="/login">Login</Link></li> {/* TODO: change to Logout if already logged in */}
          <li className="headerLink"><Link href="/register">Register</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Header