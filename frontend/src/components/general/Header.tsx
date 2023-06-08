import { useSession, signOut } from "next-auth/react";
import { Button, Dropdown, Navbar } from "flowbite-react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
/**
 * This function builds the header seen on the site.
 * @returns Header component.
 */
export default function Header() {
  const { data: session } = useSession();
  const { push } = useRouter();

  const [, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", "false");
    }
    setDarkMode(localStorage.getItem("darkMode") === "true");
  }, []);

  return (
    <div
      className={`max-w-7xl mx-auto sticky top-0 py-4 z-50 bg-gradient-to-b from-[#f3f4f6e6] dark:from-[#111827e6]`}
    >
      <Navbar fluid={true} rounded={true} className="shadow-md rounded-md">
        <Navbar.Brand href="/" as={Link} className="grid-column">
          <img
            src="../logo_dark.png"
            className="mr-3 h-6 sm:h-9 hidden dark:block"
          />
          <img
            src="https://www.tactalyse.com/wp-content/uploads/2019/07/tactalyse-sport-analyse.png"
            className="mr-3 h-6 sm:h-9 dark:hidden"
          />
        </Navbar.Brand>

        {session ? (
          <div className="flex md:order-2 gap-1 items-center">
            <Dropdown
              label={
                <span className="hidden md:inline-block capitalize dark:text-white transition-all ease-in-out duration-500">
                  {session?.user.email.split("@")[0]}
                </span>
              }
              arrowIcon={false}
              inline={true}
            >
              <Dropdown.Header>
                <div className="flex flex-col">
                  <span className="text-sm text-black dark:text-white">
                    {session?.user.email}
                  </span>
                  <span className="text-sm text-slate-500">
                    {session?.user.id}
                  </span>
                </div>
              </Dropdown.Header>
              {!session?.user.isEmployee && (
                <>
                  <Dropdown.Item
                    icon={MdDashboard}
                    onClick={() => push("/dashboard")}
                  >
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={AiOutlineShopping}
                    onClick={() => push("/order")}
                  >
                    Buy report
                  </Dropdown.Item>
                </>
              )}
              {session?.user.isEmployee && (
                <Dropdown.Item
                  icon={BiPackage}
                  onClick={() => push("/handleOrders")}
                >
                  Handle orders
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item icon={MdLogout} onClick={() => signOut()}>
                Logout
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle className="focus:!ring-0" />
          </div>
        ) : (
          <div className="flex md:order-2 gap-1">
            <Button
              className="hidden md:block rounded-md !bg-transparent hover:!bg-transparent hover:!text-[#FF2301] !text-black dark:!text-[#9CA3AF] dark:hover:!text-[#FF2301]"
              size="sm"
              onClick={() => push("/auth/login")}
            >
              Sign In
            </Button>
            <Button
              className="hidden md:block"
              size="sm"
              onClick={() => push("/auth/register")}
            >
              Sign up
            </Button>
            <Navbar.Toggle className="focus:!ring-0" />
          </div>
        )}

        <Navbar.Collapse id="menu">
          <Navbar.Link
            as={Link}
            href="/"
            className="rounded-md hover:!text-[#FF2301] transition-all ease-in-out duration-500"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/#pricing"
            className="rounded-md hover:!text-[#FF2301] transition-all ease-in-out duration-500"
          >
            Pricing
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/#faq"
            className="rounded-md hover:!text-[#FF2301] transition-all ease-in-out duration-500"
          >
            FAQ
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/contact"
            className="rounded-md hover:!text-[#FF2301] transition-all ease-in-out duration-500"
          >
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
