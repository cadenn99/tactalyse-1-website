import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react"

/**
 * This function builds the header seen on the site.
 * @returns Header component.
 */
export default function Header() {
  /**
   * Constants for managing state in the header.
   */
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession()

  /**
   * This hook deals with sepcial effects if the page is scrolled.
   */
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
    <header className={`${isScrolled && 'bg-white/90 ' || 'bg-white'} shadow-md`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <Image 
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
          { session?.user.isEmployee &&  <li className="headerLink"><Link href="/generate">Generate</Link></li> }
          { session?.user.isEmployee &&  <li className="headerLink"><Link href="/handleOrder">Resolve Outstanding</Link></li> }
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <ul className="hidden space-x-4 md:flex">
          {!session && <li className="headerLink"><Link href="/auth/login">Sign in</Link></li>}
          { !session && <li className="headerLink"><Link href="/auth/register">Register</Link></li>}
          { session && <li className="headerLink"><button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button></li>}
          { session && <li className="headerLink"><Link href="/auth/account">Account</Link></li>}
        </ul>
      </div>
    </header>
  )
}